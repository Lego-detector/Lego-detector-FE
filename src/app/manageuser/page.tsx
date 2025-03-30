'use client';

import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem, TablePagination, Typography, Box, IconButton } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import { tempUsers } from '@/modules/home/_constants/usersRole';
import axiosInstance from '@/shared/utils/axios';
import { getCredentials } from '@/shared/utils/cookie';

const roles = ['Admin', 'L1', 'L2', 'L3', 'L4'];

export default function UserRoleManagement() {
  const [users, setUsers] = useState(tempUsers);
  const [editedRoles, setEditedRoles] = useState<{ [key: string]: string }>({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRoleChange = (id: string, newRole: string) => {
    setEditedRoles((prev) => ({ ...prev, [id]: newRole }));
  };

  const handleConfirm = (id: string) => {
    // sent to BE

    //just demo, can be remove
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id ? { ...user, role: editedRoles[id] || user.role } : user
      )
    );
    setEditedRoles((prev) => {
      const newRoles = { ...prev };
      delete newRoles[id];
      return newRoles;
    });
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getUsers = async () => {
    const axiosRes = await axiosInstance(`${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/user-dashboard`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getCredentials().accessToken}`,
      },
    },)
    return axiosRes.data.data.data;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getUsers();
        console.log(res);
        setUsers(res);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [])

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Manage Users
      </Typography>
      <Paper sx={{ width: '100%', overflow: 'hidden', p: 2 }}>
        <TableContainer>
          <Table sx={{ width: '100%' }}>
            <TableHead>
              <TableRow sx={{ borderBottom: '2px solid rgba(224, 224, 224, 1)' }}>
                <TableCell sx={{ pl: 3, width: '10%', fontWeight: 'bold' }}>ID</TableCell>
                <TableCell sx={{ width: '40%', fontWeight: 'bold' }}>Name</TableCell>
                <TableCell sx={{ width: '20%', fontWeight: 'bold' }}>Role</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.from({ length: rowsPerPage }).map((_, index) => {
                const user = users[page * rowsPerPage + index];
                return user ? (
                  <TableRow key={user._id} sx={{ height: 75 }}>
                    <TableCell sx={{ pl: 3, width: '10%' }}>{user._id}</TableCell>
                    <TableCell sx={{ width: '40%' }}>{`${user.fname} ${user.lname}`}</TableCell>
                    <TableCell sx={{ width: '20%' }}>
                      <Box display="flex" alignItems="center" height="100%">
                        <Select
                          value={editedRoles[user._id] ?? user.role}
                          onChange={(e) => handleRoleChange(user._id, e.target.value)}
                          sx={{ height: 30, fontSize: 14, flexGrow: 1 }}
                          >
                          {roles.map((role) => (
                            <MenuItem key={role} value={role}>
                              {role}
                            </MenuItem>
                          ))}
                        </Select>
                        <IconButton
                          color="primary"
                          disabled={!editedRoles[user._id]}
                          onClick={() => handleConfirm(user._id)}
                          sx={{ ml: 1 }}
                          >
                          <CheckCircleIcon />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ) : (
                  <TableRow key={`empty-${index}`} sx={{ height: 75 }}>
                    <TableCell sx={{ pl: 3, width: '10%' }}>&nbsp;</TableCell>
                    <TableCell sx={{ width: '40%' }}>&nbsp;</TableCell>
                    <TableCell sx={{ width: '20%' }}>&nbsp;</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 20]}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          />
      </Paper>
    </>
  );
}


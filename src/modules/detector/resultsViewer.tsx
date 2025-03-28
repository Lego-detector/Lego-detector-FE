'use client'

import LinearProgress from '@mui/joy/LinearProgress';
import Card from '@/shared/components/card';

import React, { useState } from 'react';
import { useGetInferenceResults } from './_hooks';
import { BoundingBoxCanvas } from './_components';
import { useCountUp } from 'use-count-up';
import { useParams } from 'next/navigation';
import { ClassNames, InferenceResults } from './types';
import { useGetClassNames } from './_hooks/useGetClassNames';

import { Button, Checkbox, Chip, Grid2, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';


export function ResultsViewer() {
    const { id } = useParams<{ id: string; }>();
    const { isSuccess: isfetchClassNameSucess, data: classList } = useGetClassNames();
    const { isSuccess: isfetchResultsSuccess, data: inferenceResults } = useGetInferenceResults({ sessionId: id });
    const { value } = useCountUp({
        isCounting: true,
        duration: 3,
        easing: 'easeOutCubic',
        start: 0,
        end: 9750,
    });
    
    return (
        <Grid2 
        alignItems='center' 
        justifyContent='center'
        height={580}
        >
            {
                (isfetchResultsSuccess && isfetchClassNameSucess) 
                ? 
                <Results results={inferenceResults} classList={classList}/>
                : 
                <Card 
                    display='block' 
                    flexDirection='column' 
                    gap={2}
                    width={775}
                    height={'40%'}
                    justifyContent='space-between'
                >
                <LinearProgress 
                    determinate
                    variant='solid' 
                    size='lg'
                    value={Number(value!)/100}
                    
                />
            </Card>
            }
        </Grid2>
    );
}

type ResultsProps = {
    results: InferenceResults
    classList: ClassNames[]
}

type CheckedBox = {
    toggleAll: boolean
    checked: Set<number>
}

function Results({ results, classList }: ResultsProps) {
    const [checkedBox, setCheckedBox] = useState<CheckedBox>({
        toggleAll: true,
        checked: new Set(classList.map(cls => cls.classId))
    });

    const handleToggleAll = () => {
        setCheckedBox(checkedBox => {
            return {
                toggleAll: !checkedBox.toggleAll,
                checked: !checkedBox.toggleAll ? new Set(classList.map(cls => cls.classId)) : new Set()
            }
        });
    }
  
    const handleCheck = (value: number) => () => {
        const setChecked = new Set(checkedBox.checked);
    
        if (setChecked.has(value)) {
            setChecked.delete(value);
        } else {
            setChecked.add(value);
        }
        
        setCheckedBox({ 
            toggleAll: classList?.length == setChecked.size, 
            checked: setChecked
        });
      };

    return (
        <Grid2 container gap={8} height={520} justifyContent='center'>
            <Grid2 size={7} height={520}>
                <Card 
                    display='flex'
                    height='100%'
                    gap={2}
                >
                    <BoundingBoxCanvas
                        imageUrl={'http://localhost:9000/lego-detector/' + results.history.imageUrl}
                        results={results.history.results ?? []}
                        all={checkedBox.toggleAll}
                        checked={checkedBox.checked}
                    />
                </Card>
            </Grid2>

            <Grid2 size={2} height={520}>
                <Card
                    width={1}
                    justifyContent='start'
                    flexDirection='column'
                    height='100%'
                >
                    <Typography variant='overline' color='textPrimary'>
                        Appeared Objects
                    </Typography>
                    <Button onClick={handleToggleAll}>toggle All</Button>
                    { <List 
                        sx={{ 
                            height: '100%', 
                            width: '100%', 
                            // maxWidth: 360, 
                            overflow: 'auto',
                            position: 'relative',
                            bgcolor: 'background.paper' 
                        }}
                    >
                        {classList.map(
                            (label: ClassNames, index: number) => {
                                if (!results.summary[label.classId]) {
                                    return null;
                                }

                                const labelId = `checkbox-list-label-${label.classId}-no-${index}`;

                                return (
                                <ListItem
                                    key={labelId}
                                    disablePadding
                                >
                                    <ListItemButton role={undefined} onClick={handleCheck(label.classId)} dense>
                                    <ListItemIcon>
                                        <Checkbox
                                            edge='start'
                                            checked={
                                                checkedBox.toggleAll || checkedBox.checked.has(label.classId)
                                            }
                                            tabIndex={-1}
                                            disableRipple
                                        />
                                    </ListItemIcon>
                                    <Grid2 container justifyContent="space-between" alignItems="center" width={1}>
                                        <Grid2 size={8}>
                                            <ListItemText 
                                                id={labelId} 
                                                secondary={`${label.className}`} 
                                            />
                                        </Grid2>
                                        <Chip variant="outlined" color="primary" size="small" label={`${results.summary[label.classId] ?? 0}`} />
                                    </Grid2>
                                    </ListItemButton>
                                </ListItem>
                            );
                        })}
                        </List>}
                </Card>
            </Grid2>

        </Grid2>
    );
}


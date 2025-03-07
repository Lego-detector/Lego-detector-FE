export const base64ToFile = (base64String: string) => {
    const byteCharacters = atob(base64String.split(",")[1]); // Remove the Base64 prefix
    const match = base64String.match(/^data:(.*?);base64,/);
    const mimeType = match ? match[1] : undefined;
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    
    return new File([byteArray], "image.jpeg", { type: mimeType }); // Convert to File object
};
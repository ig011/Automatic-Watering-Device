import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  DialogContent,
} from "@mui/material";

const DeleteFileDialog = ({ fileName, openDialog, setOpenDialog }: any) => {
  const handleCloseDialog = () => setOpenDialog(false);

  return (
    <Dialog open={openDialog}>
      <DialogTitle>Are you sure you want to delete {fileName}?</DialogTitle>
      <DialogContent>This operation cannot be undone</DialogContent>
      <DialogActions>
        <Button>Yes</Button>
        <Button onClick={handleCloseDialog}>No</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteFileDialog;

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

interface IDeleteFileDialogInterface {
  fileName: string;
  openDialog: boolean;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeleteFileDialog = ({
  fileName,
  openDialog,
  setOpenDialog,
}: IDeleteFileDialogInterface) => {
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

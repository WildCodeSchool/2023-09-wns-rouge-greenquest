import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { QuestType } from "../QuestsTab";
import { userType } from "../Header";
import {
  Button,
  IconButton,
  SnackbarContent,
  ThemeProvider,
} from "@mui/material";
import { useMutation } from "@apollo/client";
import { mutationDeleteQuest } from "@/graphql/mutationDeleteQuest";
import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";
import { queryGetQuestByUser } from "@/graphql/queryGetQuestByUser";
import LeaderBoard from "../LeaderBoard";
import CloseIcon from "@mui/icons-material/Close";
import WarningIcon from "@mui/icons-material/Warning";

interface State extends SnackbarOrigin {
  open: boolean;
}

const firtsModalstyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "70%", sm: "60%", md: "40%", lg: "40%", xl: "25%" },

  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "15px",
};

const secondeModalstyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "70%", sm: "60%", md: "40%", lg: "40%", xl: "25%" },

  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "15px",
};

type QuestDetailsModalType = {
  handleClose: () => void;
  modalOpen: boolean;
  quest: QuestType | null;
  me: userType | undefined;
  refetch: () => void;
};

export default function BasicModal({
  handleClose,
  modalOpen,
  quest,
  me,
  refetch,
}: QuestDetailsModalType) {
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [state, setState] = React.useState<State>({
    open: false,
    vertical: "top",
    horizontal: "center",
  });

  const { vertical, horizontal, open } = state;

  const formatDate = (dateString: string): string => {
    if (!dateString || typeof dateString !== "string") {
      return "Date non valide";
    }

    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return "Date non valide";
    }

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const handleClick = (newState: SnackbarOrigin) => {
    setState({ ...newState, open: true });
  };

  const handleCloseSnackbar = () => {
    setState({ ...state, open: false });
  };

  const [deleteQuest] = useMutation(mutationDeleteQuest, {
    variables: { deleteQuestId: quest?.id },
    refetchQueries: [queryGetQuestByUser],
    onCompleted: () => {
      refetch(); // Appelle refetch après la suppression
      handleClick({ vertical: "top", horizontal: "right" });
    },
  });

  const handleOpenConfirmModal = () => {
    handleClose();
    setConfirmOpen(true);
  };

  const handleCloseConfirmModal = () => {
    setConfirmOpen(false);
  };

  return (
    <div>
      <Modal
        open={modalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ borderRadius: "10px" }}
      >
        <Box sx={firtsModalstyle} key={quest?.id}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              width="100%"
            >
              {quest?.title}
            </Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 1, fontStyle: "italic" }}
          >
            {quest?.description}
          </Typography>
          <Typography id="modal-modal-description">
            <strong>Date de début :</strong>{" "}
            {quest?.startDate
              ? formatDate(quest.startDate)
              : "Date non disponible"}
          </Typography>
          <Typography id="modal-modal-description">
            <strong>Durée :</strong> {quest?.duration}{" "}
            {quest?.duration === 1 ? "jour" : "jours"}
          </Typography>
          <br />
          <Typography id="modal-modal-description">
            <strong>Classement des aventuriers :</strong>
          </Typography>
          <br />
          <LeaderBoard questId={quest?.id} userId={me?.id} key={quest?.id} />
          <br />
          <>
            {quest?.createdBy.id === me?.id && (
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Button
                  key={quest?.id}
                  sx={{
                    color: "red",
                    fontSize: "1rem",
                    backgroundColor: "#f0f0f0",
                    border: "1px solid #d3d3d3",
                    padding: "10px 20px",
                    "&:hover": {
                      backgroundColor: "#e0e0e0",
                    },
                  }}
                  onClick={handleOpenConfirmModal}
                >
                  Supprimer
                </Button>
              </Box>
            )}
          </>
        </Box>
      </Modal>
      <Modal open={confirmOpen} onClose={handleCloseConfirmModal}>
        <Box sx={secondeModalstyle}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <WarningIcon
              sx={{ color: "orange", fontSize: 36, margin: "1rem" }}
            />{" "}
            <Typography id="modal-modal-description" variant="h6">
              Es-tu sûr.e de vouloir supprimer cette quête ?
            </Typography>
          </Box>

          <Typography
            id="modal-modal-description"
            sx={{ mt: 2, fontSize: "16px", fontWeight: "normal" }}
            variant="h6"
          >
            Les missions associées à cette quête, les points et le classement
            des aventuriers seront définitivement supprimés.
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              mt: 2,
            }}
          >
            <Button
              sx={{
                color: "red",
                fontSize: "15px",
                mt: 2,
                backgroundColor: "#f0f0f0",
                border: "1px solid #d3d3d3",
                padding: "10px 20px",
                "&:hover": {
                  backgroundColor: "#e0e0e0",
                },
              }}
              onClick={() => {
                deleteQuest();
                handleCloseConfirmModal();
              }}
            >
              Confirmer
            </Button>
            <Button
              sx={{
                fontSize: "15px",
                mt: 2,
                backgroundColor: "#f0f0f0",
                border: "1px solid #d3d3d3",
                padding: "10px 20px",
                "&:hover": {
                  backgroundColor: "#e0e0e0",
                },
              }}
              onClick={handleCloseConfirmModal}
            >
              Annuler
            </Button>
          </Box>
        </Box>
      </Modal>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleCloseSnackbar}
        autoHideDuration={5000}
        key={vertical + horizontal}
        sx={{
          "& .MuiSnackbarContent-root": {
            backgroundColor: "#333",
            color: "#fff",
            borderRadius: "10px",
            fontSize: "15px",
          },
        }}
      >
        <SnackbarContent
          message={
            <span>
              La quête{" "}
              <strong>
                <em>{quest?.title}</em>
              </strong>{" "}
              a été supprimée 👍🏻
            </span>
          }
        />
      </Snackbar>
    </div>
  );
}

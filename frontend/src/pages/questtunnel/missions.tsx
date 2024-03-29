import Layout from "@/components/Layout";
import {
  Grid,
  Typography,
  Button,
  Paper,
  Card,
  CardContent,
  IconButton,
  Select,
  MenuItem,
  InputLabel,
  SelectChangeEvent,
} from "@mui/material";
import { useRouter } from "next/router";
import CloseIcon from "@mui/icons-material/Close";
import { queryAllMissions } from "@/graphql/queryAllMissions";
import { useQuery } from "@apollo/client";
import { useQuestContext } from "@/contexts/QuestContext";
import { useEffect, useState } from "react";

export type MissionType = {
  id: number;
  title: string;
  description?: string;
  XPValue: number;
  difficulty: string;
  byDefault: boolean;
};

export default function DifficultyLevel() {
  const { setQuestInfo } = useQuestContext();
  const { data: dataMissions } = useQuery<{ getMissions: MissionType[] }>(queryAllMissions);
  const [missions, setMissions] = useState<MissionType[]>([]);
  const [selectedMissionTitle, setSelectedMissionTitle] = useState<string>("");

  const router = useRouter();

  useEffect(() => {
    if (dataMissions) {
      setMissions(dataMissions.getMissions.slice(0, 3));
    }
  }, [dataMissions]);

  const previousPage = () => {
    router.back();
  };

  const nextPage = () => {
    setQuestInfo((prevQuestInfo) => ({
      ...prevQuestInfo,
      missions: missions,
    }));

    console.log(setQuestInfo);
  };

  const deleteMission = (id: number) => {
    setMissions(prevMissions => prevMissions.filter(mission => mission.id !== id));
  };

  const selectMission = (event: SelectChangeEvent<string>) => {
    setSelectedMissionTitle(event.target.value);
    const missionToAdd = dataMissions?.getMissions.find(
        (mission) => mission.title === event.target.value
    );
    if (missionToAdd && !missions.some((mission) => mission.id === missionToAdd.id)) {
      setMissions((prevMissions) => [...prevMissions, missionToAdd]);
    }
  };

  return (
      <Layout title="Niveau de difficulté">
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            gap={5}
            marginTop={3}
        >
          <Typography variant="h1" sx={{ fontSize: "2rem", fontWeight: "bold" }}>
            Créer votre quête
          </Typography>

          <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
              component={Paper}
              elevation={3}
              sx={{
                maxWidth: "90%",
                padding: 4,
                borderRadius: 5,
              }}
              gap={3}
          >
            <Typography variant="h2" sx={{ fontSize: "1.5rem" }}>
              Étape 4
            </Typography>
            <Typography variant="h3" sx={{ fontSize: "1rem" }}>
              Choisissez vos missions
            </Typography>

            <Grid container direction="column" gap={2} sx={{ width: "100%" }}>
              {missions.map((mission) => (
                  <Card
                      key={mission.id}
                      sx={{ position: "relative", backgroundColor: "#E0B676" }}
                  >
                    <IconButton
                        sx={{ position: "absolute", top: 0, right: 0 }}
                        onClick={() => deleteMission(mission.id)}
                    >
                      <CloseIcon />
                    </IconButton>
                    <CardContent>
                      <Typography variant="h5" component="div">
                        {mission.title}
                      </Typography>
                      <Typography variant="body2">{mission.description}</Typography>
                      <Typography variant="body2">
                        Points: {mission.XPValue}
                      </Typography>
                    </CardContent>
                  </Card>
              ))}
            </Grid>
            <InputLabel id="select-label">
              Sélectionner une autre mission ?
            </InputLabel>
            <Select
                fullWidth
                value={selectedMissionTitle}
                variant="outlined"
                onChange={selectMission}
                sx={{
                  "&.Mui-focused fieldset": {
                    borderColor: "#7BD389 !important",
                  },
                }}
            >
              {dataMissions?.getMissions.map((mission) => (
                  <MenuItem key={mission.id} value={mission.title}>
                    {mission.title}
                  </MenuItem>
              ))}
            </Select>
            <Grid
                container
                justifyContent="space-between"
                alignItems="center"
                width="100%"
            >
              <Button
                  variant="contained"
                  onClick={previousPage}
                  sx={{ bgcolor: "#7BD389", color: "#000000" }}
              >
                Retour
              </Button>
              <Button
                  variant="contained"
                  onClick={nextPage}
                  sx={{ bgcolor: "#7BD389", color: "#000000" }}
              >
                Valider
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Layout>
  );
}

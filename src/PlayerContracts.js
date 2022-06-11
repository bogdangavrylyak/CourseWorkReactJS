import React from "react";
import CRUDTable, {
  Fields,
  Field,
  CreateForm,
  UpdateForm,
  DeleteForm,
} from "react-crud-table";
import * as _ from "lodash";
import ReactToPdf from "react-to-pdf";
// Component's Base CSS
import "./index.css";
import Loader from "./Loader";
import { getClubManagerList } from "./services/clubManager.servise";
import {
  createPlayerContract,
  deletePlayerContract,
  getPlayerContractList,
  updatePlayerContract,
} from "./services/playerContract.servise";
import { getPlayerList } from "./services/player.servise";
import {
  dateDisplayRenderer,
  dateRenderer,
  selectDisplayRenderer,
  selectRenderer,
  styles,
} from "./shared";

const validation = (values) => {
  const errors = {};
  if (!values.playerId) {
    errors.playerId = "Please, provide player's name";
  }

  if (!values.clubManagerId) {
    errors.clubManagerId = "Please, provide clubManager's name";
  }

  if (!values.documentNumber) {
    errors.documentNumber = "Please, provide documentNumber";
  }

  if (values.documentNumber && values.documentNumber.length > 10) {
    errors.documentNumber = "documentNumber should be less than 10 symbols";
  }

  if (!values.signatureDate) {
    errors.signatureDate = "Please, provide signatureDate";
  }
  if (!values.endDate) {
    errors.endDate = "Please, provide endDate";
  }
  if (!values.estimatedSalaryPerYear) {
    errors.estimatedSalaryPerYear = "Please, provide estimatedSalaryPerYear";
  }
  if (!values.playerNumber) {
    errors.playerNumber = "Please, provide playerNumber";
  }

  //   "trainerId",
  //   "clubManagerId",
  //   "documentNumber",
  //   "signatureDate",
  //   "endDate",
  //   "estimatedSalaryPerYear",
  //   "dataOfWorkStart",

  //   "playerContractId": 1,
  //   "playerId": 1,
  //   "playerName": "VasylBelyak",
  //   "clubManagerId": 1,
  //   "clubManagerName": "RudnytskyiIvan",

  //   "documentNumber": "#1",
  //   "signatureDate": "2022-05-24T20:36:47.337",
  //   "endDate": "2022-05-24T20:36:47.337",
  //   "estimatedSalaryPerYear": "string",
  //   "playerNumber": "string"

  console.info("Errors validation", errors);
  return errors;
};
const PlayerContracts = () => {
  const [loading, setLoading] = React.useState(true);
  const [players, setPlayers] = React.useState([]);
  const [clubManagers, setClubManagers] = React.useState([]);

  const fetchPlayerClubManager = async () => {
    setLoading(true);
    const l = await getPlayerList();
    const c = await getClubManagerList();
    setPlayers(l || []);
    setClubManagers(c || []);
    setLoading(false);
  };

  React.useEffect(() => {
    fetchPlayerClubManager();
  }, []);

  const service = {
    fetchItems: (payload) => {
      return Promise.resolve(getPlayerContractList());
    },
    create: (data) => {
      return Promise.resolve(createPlayerContract(data));
    },
    update: (data) => {
      const id = data.playerContractId;
      return Promise.resolve(
        updatePlayerContract(
          _.pick(data, [
            "documentNumber",
            "playerId",
            "clubManagerId",
            "signatureDate",
            "endDate",
            "estimatedSalaryPerYear",
            "playerNumber",
          ]),
          id
        )
      );
    },
    delete: (data) => {
      return Promise.resolve(deletePlayerContract(data.playerContractId));
    },
  };

  if (loading) {
    return <Loader />;
  }
  const ref = React.createRef();

  const name = "player_contracts_" + Date.now();

  return (
    <div style={styles.container}>
      <ReactToPdf
        targetRef={ref}
        filename={`${name}.pdf`}
        options={{ orientation: "landscape" }}
        scale={1.1}
      >
        {({ toPdf }) => <button onClick={toPdf}>Generate pdf</button>}
      </ReactToPdf>
      <div ref={ref}>
        <CRUDTable
          caption="PlayerContract"
          fetchItems={(payload) => service.fetchItems(payload)}
          // items={clubs}
        >
          <Fields>
            <Field
              name="documentNumber"
              label="documentNumber"
              placeholder="documentNumber"
            />
            <Field
              name="playerId"
              label="player"
              placeholder="player"
              type="number"
              render={(data) =>
                selectRenderer(
                  data,
                  players,
                  "Select player",
                  "playerId",
                  "playerName"
                )
              }
              tableValueResolver={(data) =>
                selectDisplayRenderer(data, players, "playerId", "playerName")
              }
            />
            <Field
              name="clubManagerId"
              label="clubManager"
              placeholder="clubManager"
              type="number"
              render={(data) =>
                selectRenderer(
                  data,
                  clubManagers,
                  "Select clubManager",
                  "clubManagerId",
                  "clubManagerName"
                )
              }
              tableValueResolver={(data) =>
                selectDisplayRenderer(
                  data,
                  clubManagers,
                  "clubManagerId",
                  "clubManagerName"
                )
              }
            />

            <Field
              name="signatureDate"
              label="Signature Date"
              placeholder="signatureDate"
              type="date"
              render={dateRenderer}
              tableValueResolver={(data) =>
                dateDisplayRenderer(data, "signatureDate")
              }
            />
            <Field
              name="endDate"
              label="End Date"
              placeholder="endDate"
              type="date"
              render={dateRenderer}
              tableValueResolver={(data) =>
                dateDisplayRenderer(data, "endDate")
              }
            />
            <Field
              name="estimatedSalaryPerYear"
              label="Estimated Salary PerYear"
              placeholder="estimatedSalaryPerYear"
            />
            <Field
              name="playerNumber"
              label="playerNumber"
              placeholder="playerNumber"
            />
          </Fields>
          <CreateForm
            title="PlayerContract Creation"
            message="Create a new PlayerContract!"
            trigger="Create PlayerContract"
            onSubmit={(task) => service.create(task)}
            submitText="Create"
            validate={(values) => {
              return validation(values);
            }}
          />

          <UpdateForm
            title="PlayerContract Update Process"
            message="Update PlayerContract"
            trigger="Update"
            onSubmit={(task) => service.update(task)}
            submitText="Update"
            validate={(values) => {
              return validation(values);
            }}
          />

          <DeleteForm
            title="PlayerContract Delete Process"
            message="Are you sure you want to delete the PlayerContract?"
            trigger="Delete"
            onSubmit={(task) => service.delete(task)}
            submitText="Delete"
            validate={(values) => {
              return {};
            }}
          />
        </CRUDTable>
      </div>
    </div>
  );
};

export default PlayerContracts;

import React from "react";
import CRUDTable, {
  Fields,
  Field,
  CreateForm,
  UpdateForm,
  DeleteForm,
} from "react-crud-table";
import * as _ from "lodash";

// Component's Base CSS
import "./index.css";
import Loader from "./Loader";
import { getClubList } from "./services/club.service";
import {
  createTransferHistory,
  deleteTransferHistory,
  getTransferHistoryList,
  updateTransferHistory,
} from "./services/transferHistory.servise";
import { getPlayerList } from "./services/player.servise";
import { getPositionList } from "./services/position.servise";
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

  if (!values.basketClubId) {
    errors.basketClubId = "Please, provide basketClubId";
  }
  if (!values.positionId) {
    errors.positionId = "Please, provide position";
  }

  if (!values.performanceStartDate) {
    errors.performanceStartDate = "Please, provide performanceStartDate";
  }
  if (!values.performanceEndDate) {
    errors.performanceEndDate = "Please, provide performanceEndDate";
  }

  // "transferHistoryId": 0,
  // "playerId": 0,
  // "basketClubId": 0,
  // "positionId": 0,
  // "performanceStartDate": "2022-05-24T22:17:49.608Z",
  // "performanceEndDate": "2022-05-24T22:17:49.608Z

  console.info("Errors validation", errors);
  return errors;
};
const TransferHistories = () => {
  const [loading, setLoading] = React.useState(true);
  const [players, setPlayers] = React.useState([]);
  const [clubs, setClubs] = React.useState([]);
  const [positions, setPositions] = React.useState([]);

  const fetchPlayerClubManager = async () => {
    setLoading(true);
    const l = await getPlayerList();
    const c = await getClubList();
    const p = await getPositionList();
    setPlayers(l || []);
    setClubs(c || []);
    setPositions(p || []);
    setLoading(false);
  };

  React.useEffect(() => {
    fetchPlayerClubManager();
  }, []);

  const service = {
    fetchItems: (payload) => {
      return Promise.resolve(getTransferHistoryList());
    },
    create: (data) => {
      return Promise.resolve(createTransferHistory(data));
    },
    update: (data) => {
      const id = data.transferHistoryId;
      return Promise.resolve(
        updateTransferHistory(
          _.pick(data, [
            "playerId",
            "basketClubId",
            "positionId",
            "performanceStartDate",
            "performanceEndDate",
          ]),
          id
        )
      );
    },
    delete: (data) => {
      return Promise.resolve(deleteTransferHistory(data.transferHistoryId));
    },
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div style={styles.container}>
      <CRUDTable
        caption="TransferHistory"
        fetchItems={(payload) => service.fetchItems(payload)}
        // items={clubs}
      >
        <Fields>
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
            name="basketClubId"
            label="basketClub"
            placeholder="basketClub"
            type="number"
            render={(data) =>
              selectRenderer(
                data,
                clubs,
                "Select basketClub",
                "basketClubId",
                "basketClubName"
              )
            }
            tableValueResolver={(data) =>
              selectDisplayRenderer(
                data,
                clubs,
                "basketClubId",
                "basketClubName"
              )
            }
          />

          <Field
            name="positionId"
            label="position"
            placeholder="position"
            type="number"
            render={(data) =>
              selectRenderer(
                data,
                positions,
                "Select position",
                "positionId",
                "positionName"
              )
            }
            tableValueResolver={(data) =>
              selectDisplayRenderer(
                data,
                positions,
                "positionId",
                "positionName"
              )
            }
          />

          <Field
            name="performanceStartDate"
            label="performanceStartDate"
            placeholder="performanceStartDate"
            type="date"
            render={dateRenderer}
            tableValueResolver={(data) =>
              dateDisplayRenderer(data, "performanceStartDate")
            }
          />
          <Field
            name="performanceEndDate"
            label="performanceEndDate"
            placeholder="performanceEndDate"
            type="date"
            render={dateRenderer}
            tableValueResolver={(data) =>
              dateDisplayRenderer(data, "performanceEndDate")
            }
          />
        </Fields>
        <CreateForm
          title="TransferHistory Creation"
          message="Create a new TransferHistory!"
          trigger="Create TransferHistory"
          onSubmit={(task) => service.create(task)}
          submitText="Create"
          validate={(values) => {
            return validation(values);
          }}
        />

        <UpdateForm
          title="TransferHistory Update Process"
          message="Update TransferHistory"
          trigger="Update"
          onSubmit={(task) => service.update(task)}
          submitText="Update"
          validate={(values) => {
            return validation(values);
          }}
        />

        <DeleteForm
          title="TransferHistory Delete Process"
          message="Are you sure you want to delete the TransferHistory?"
          trigger="Delete"
          onSubmit={(task) => service.delete(task)}
          submitText="Delete"
          validate={(values) => {
            return {};
          }}
        />
      </CRUDTable>
    </div>
  );
};

export default TransferHistories;

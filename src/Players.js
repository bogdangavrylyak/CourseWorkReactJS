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
import { getEmployee } from "./services/employee.service";
import { getPositionList } from "./services/position.servise";
import { getNationalityList } from "./services/nationality.servise";
import {
  createPlayer,
  deletePlayer,
  getPlayerList,
  updatePlayer,
} from "./services/player.servise";
import { selectDisplayRenderer, selectRenderer, styles } from "./shared";

const validation = (values) => {
  const errors = {};
  if (!values.playerName) {
    errors.playerName = "Please, provide player's name";
  }

  if (!values.agentId) {
    errors.agentId = "Please, provide club's agent";
  }
  if (!values.positionId) {
    errors.positionId = "Please, provide position";
  }
  if (!values.nationalityId) {
    errors.nationalityId = "Please, provide nationality";
  }

  if (!values.playerHeight) {
    errors.playerHeight = "Please, provide playerHeight";
  }

  if (!values.playerWeight) {
    errors.playerWeight = "Please, provide playerWeight";
  }

  if (!values.avgPoint) {
    errors.avgPoint = "Please, provide avgPoint";
  }

  if (!values.avgAssist) {
    errors.avgAssist = "Please, provide avgAssist";
  }

  if (!values.avgBlock) {
    errors.avgBlock = "Please, provide avgBlock";
  }

  if (!values.avgSteal) {
    errors.avgSteal = "Please, provide avgSteal";
  }

  if (!values.percentOf2) {
    errors.percentOf2 = "Please, provide percentOf2";
  }

  if (!values.percentOf3) {
    errors.percentOf3 = "Please, provide percentOf3";
  }
  if (!values.careerStartYear) {
    errors.careerStartYear = "Please, provide  careerStartYear";
  }

  if (!values.playerAddress) {
    errors.playerAddress = "Please, provide playerAddress";
  }

  if (!values.email) {
    errors.email = "Please, provide  email";
  }
  if (!values.phone) {
    errors.phone = "Please, provide  phone";
  }
  if (!values.playerDescription) {
    errors.playerDescription = "Please, provide playerDescription";
  }

  //   "playerId": 1,
  //   "agentId": 1,
  //   "agentName": "LionelMessi",

  //   "positionId": 1,
  //   "positionName": "Point Guard",

  //   "nationalityId": 1,
  //   "nationalityName": "Ukraine",

  //   "playerName": "VasylBelyak",

  //   "playerHeight": "175sm",
  //   "playerWeight": "90kg",
  //   "avgPoint": "30_point",
  //   "avgAssist": "8,4_assist",
  //   "avgBlock": "0,8_block",
  //   "avgSteal": "2,3_steal",
  //   "percentOf2": "70_PercentOf2",
  //   "percentOf3": "70_PercentOf2",
  //   "careerStartYear": "2000",
  //   "playerAddress": "Lviv_Lazarenka,14",
  //   "email": "VasylBelyak@email.com",
  //   "phone": "84643",
  //   "playerDescription": "MasterOfDunk"

  console.info("Errors validation", errors);
  return errors;
};
const Players = () => {
  const [loading, setLoading] = React.useState(true);
  const [agents, setAgents] = React.useState([]);
  const [positions, setPositionss] = React.useState([]);
  const [nationalityes, setNationalityes] = React.useState([]);

  const fetchAgents = async () => {
    setLoading(true);
    const a = await getEmployee();
    const p = await getPositionList();
    const n = await getNationalityList();
    setAgents(a || []);
    setPositionss(p || []);
    setNationalityes(n || []);
    setLoading(false);
  };

  React.useEffect(() => {
    fetchAgents();
  }, []);

  const service = {
    fetchItems: (payload) => {
      return Promise.resolve(getPlayerList());
    },
    create: (data) => {
      return Promise.resolve(createPlayer(data));
    },

    // "agentId": 1,
    // "agentName": "LionelMessi",
    // "trainerName": "ZinedineZidan",
    // "trainerAddress": "Lviv_Shevchenka,11",
    // "email": "ZinedineZidan@email.com",
    // "phone": "38631",
    // "careerStartYear": "1996"

    update: (data) => {
      const id = data.playerId;
      return Promise.resolve(
        updatePlayer(
          _.pick(data, [
            "playerName",
            "agentId",
            "positionId",
            "nationalityId",
            "playerHeight",
            "playerWeight",
            "avgPoint",
            "avgAssist",
            "avgBlock",
            "avgSteal",
            "percentOf2",
            "percentOf3",
            "careerStartYear",
            "playerAddress",
            "email",
            "phone",
            "playerDescription",
          ]),
          id
        )
      );
    },
    delete: (data) => {
      return Promise.resolve(deletePlayer(data.playerId));
    },
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div style={styles.container}>
      <CRUDTable
        caption="Players"
        fetchItems={(payload) => service.fetchItems(payload)}
        // items={clubs}
      >
        <Fields>
          <Field
            name="playerName"
            label="playerName"
            placeholder="playerName"
          />
          <Field
            name="agentId"
            label="Agent"
            placeholder="Agent"
            type="number"
            render={(data) =>
              selectRenderer(
                data,
                agents,
                "Select agent",
                "agentId",
                "agentName"
              )
            }
            tableValueResolver={(data) =>
              selectDisplayRenderer(data, agents, "agentId", "agentName")
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
            name="nationalityId"
            label="nationality"
            placeholder="nationality"
            type="number"
            render={(data) =>
              selectRenderer(
                data,
                nationalityes,
                "Select nationality",
                "nationalityId",
                "nationalityName"
              )
            }
            tableValueResolver={(data) =>
              selectDisplayRenderer(
                data,
                nationalityes,
                "nationalityId",
                "nationalityName"
              )
            }
          />

          <Field
            name="playerHeight"
            label="playerHeight"
            placeholder="playerHeight"
          />
          <Field
            name="playerWeight"
            label="playerWeight"
            placeholder="playerWeight"
          />
          <Field name="avgPoint" label="avgPoint" placeholder="avgPoint" />
          <Field name="avgAssist" label="avgAssist" placeholder="avgAssist" />
          <Field name="avgBlock" label="avgBlock" placeholder="avgBlock" />
          <Field name="avgSteal" label="avgSteal" placeholder="avgSteal" />
          <Field
            name="percentOf2"
            label="percentOf2"
            placeholder="percentOf2"
          />
          <Field
            name="percentOf3"
            label="percentOf3"
            placeholder="percentOf3"
          />
          <Field
            name="careerStartYear"
            label="careerStartYear"
            placeholder="careerStartYear"
          />
          <Field
            name="playerAddress"
            label="playerAddress"
            placeholder="playerAddress"
          />
          <Field name="email" label="email" placeholder="email" />
          <Field name="phone" label="phone" placeholder="phone" />
          <Field
            name="playerDescription"
            label="playerDescription"
            placeholder="playerDescription"
          />
        </Fields>
        {/* 

    //   "playerHeight": "175sm",
    //   "playerWeight": "90kg",
    //   "avgPoint": "30_point",
    //   "avgAssist": "8,4_assist",
    //   "avgBlock": "0,8_block",
    //   "avgSteal": "2,3_steal",
    //   "percentOf2": "70_PercentOf2",
    //   "percentOf3": "70_PercentOf2",
    //   "careerStartYear": "2000",
    //   "playerAddress": "Lviv_Lazarenka,14",
    //   "email": "VasylBelyak@email.com",
    //   "phone": "84643",
    //   "playerDescription": "MasterOfDunk" */}
        <CreateForm
          title="Player Creation"
          message="Create a new Player!"
          trigger="Create Player"
          onSubmit={(task) => service.create(task)}
          submitText="Create"
          validate={(values) => {
            return validation(values);
          }}
        />

        <UpdateForm
          title="Player Update Process"
          message="Update Player"
          trigger="Update"
          onSubmit={(task) => service.update(task)}
          submitText="Update"
          validate={(values) => {
            return validation(values);
          }}
        />

        <DeleteForm
          title="Player Delete Process"
          message="Are you sure you want to delete the Player?"
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

export default Players;

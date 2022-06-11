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
import { getCityList } from "./services/city.service";
import {
  createClub,
  deleteClub,
  getClubList,
  updateClub,
} from "./services/club.service";
import { getLeagueList } from "./services/league.service";
import { selectDisplayRenderer, selectRenderer, styles } from "./shared";

const validation = (values) => {
  const errors = {};
  if (!values.basketClubName) {
    errors.basketClubName = "Please, provide club's name";
  }

  if (!values.leagueId) {
    errors.leagueId = "Please, provide club's league";
  }

  if (!values.cityId) {
    errors.cityId = "Please, provide club's city";
  }

  if (!values.yearOfFoundation) {
    errors.yearOfFoundation = "Please, provide clubs's year of Foundation";
  }
  console.info("Errors validation", errors);
  return errors;
};
const Clubs = () => {
  const [loading, setLoading] = React.useState(true);
  const [leagues, setLeagues] = React.useState([]);
  const [cities, setCities] = React.useState([]);

  const fetchLeaguesAndCities = async () => {
    setLoading(true);
    const l = await getLeagueList();
    const c = await getCityList();
    setLeagues(l || []);
    setCities(c || []);
    setLoading(false);
  };

  React.useEffect(() => {
    fetchLeaguesAndCities();
  }, []);

  const service = {
    fetchItems: (payload) => {
      return Promise.resolve(getClubList());
    },
    create: (data) => {
      return Promise.resolve(createClub(data));
    },
    update: (data) => {
      const id = data.basketClubId;
      return Promise.resolve(
        updateClub(
          _.pick(data, [
            "cityId",
            "leagueId",
            "basketClubName",
            "yearOfFoundation",
          ]),
          id
        )
      );
    },
    delete: (data) => {
      return Promise.resolve(deleteClub(data.basketClubId));
    },
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div style={styles.container}>
      <CRUDTable
        caption="Clubs"
        fetchItems={(payload) => service.fetchItems(payload)}
        // items={clubs}
      >
        <Fields>
          <Field name="basketClubName" label="Name" placeholder="Name" />
          <Field
            name="yearOfFoundation"
            label="Year of Foundation"
            placeholder="Year of Foundation"
          />
          <Field
            name="leagueId"
            label="League"
            placeholder="League"
            type="number"
            render={(data) =>
              selectRenderer(
                data,
                leagues,
                "Select league",
                "leagueId",
                "leagueName"
              )
            }
            tableValueResolver={(data) =>
              selectDisplayRenderer(data, leagues, "leagueId", "leagueName")
            }
          />
          <Field
            name="cityId"
            label="City"
            placeholder="City"
            type="number"
            render={(data) =>
              selectRenderer(data, cities, "Select city", "cityId", "cityName")
            }
            tableValueResolver={(data) =>
              selectDisplayRenderer(data, cities, "cityId", "cityName")
            }
          />
        </Fields>
        <CreateForm
          title="Club Creation"
          message="Create a new club!"
          trigger="Create club"
          onSubmit={(task) => service.create(task)}
          submitText="Create"
          validate={(values) => {
            return validation(values);
          }}
        />

        <UpdateForm
          title="Club Update Process"
          message="Update Club"
          trigger="Update"
          onSubmit={(task) => service.update(task)}
          submitText="Update"
          validate={(values) => {
            return validation(values);
          }}
        />

        <DeleteForm
          title="Club Delete Process"
          message="Are you sure you want to delete the club?"
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

export default Clubs;

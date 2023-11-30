import { useState, useEffect } from "react";
import { IoPeople } from "react-icons/io5";
import { RxBorderAll } from "react-icons/rx";
import { LiaPlusSolid } from "react-icons/lia";
import Link from "next/link";
import { Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import Grid from "@mui/material/Grid";
import axios from "@/utils/axios";
import styles from "../styles/venueItem.module.css";

function VenueListConainer({ isAdmin }) {
  const { t } = useTranslation();
  const [venueList, setVenueList] = useState([]);

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const res = await axios.get("/api/v1/stadium/stadium-list/", {}, {});
        setVenueList(res.stadium);
      } catch (error) {
        throw new Error(error);
      }
    };
    fetchVenues();
  }, []);

  return (
    <Container className="flex flex-column">
      <h1 className="justify-center text-center text-3xl">{t("Venue")}</h1>
      <Grid container spacing={5} justifyContent="flex-start" className="mt-5">
        {venueList && venueList.map((venue) => (
          <VenueItem
            id={venue.id}
            stadium={venue.name}
            venue={venue.venue_name}
            picture={venue.picture}
            area={venue.area}
            userCount={venue.current_people_count}
            userMax={venue.max_number_of_people}
            isAdmin={isAdmin}
          />

        ))}
        {isAdmin && <AddVeuneItem />}
      </Grid>
    </Container>
  );
}

function VenueItem({
  id,
  stadium,
  venue,
  picture,
  area,
  userCount,
  userMax,
  isAdmin
}) {
  const { t } = useTranslation();
  const router = useRouter();

  const handleEditClick = () => {
    router.push(`/admin/editVenue?venue=${id} `);
  };

  const handleRentClick = () => {
    router.push(`/main/venue?venue=${id} `);
  };

  return (
    <button className="w-80 bg-white rounded-xl shadow m-2" onClick={isAdmin ? handleEditClick : handleRentClick}>
      < div className="relative" >
        <div className="bg-black rounded-t-xl">
          <img
            src={picture}
            alt="Venue Image"
            height="100%"
            className="opacity-40 rounded-t-xl object-cover w-80 h-60"
          />
        </div>

        <div className={styles.absoluteCenter}>
          <p className="text-xl text-white text-center">{t(stadium)}</p>
          <p className="text-2xl text-white text-center">{t(venue)}</p>
        </div>

        <div className="flex flex-row justify-between m-3 px-2">
          <div className="flex flex-row space-x-1  items-center text-dark-blue">
            <IoPeople fill="#14274C" />
            <text>
              {userCount}
              /
              {userMax}
            </text>
          </div>
          <div className="flex flex-row space-x-2 items-center text-dark-blue">
            <RxBorderAll fill="#14274C" />
            <text>
              {area}
              {" "}
              {t("Square Meter")}
            </text>
          </div>
        </div>
      </div >
    </button >

  );
}

function AddVeuneItem() {
  const { t } = useTranslation();

  return (
    <Link
      className={`self-stretch ${styles.addVenueItem} p-20 w-80`}
      href="/admin/newVenue"
    >
      <LiaPlusSolid size={40} />
      <text>{t("Click to add a venue")}</text>
    </Link>
  );
}

export default VenueListConainer;

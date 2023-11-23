import { useState, useEffect } from "react";
import Image from "next/image";
import { IoPeople } from "react-icons/io5";
import { RxBorderAll } from "react-icons/rx";
import { LiaPlusSolid } from "react-icons/lia";
import Link from "next/link";
import { Container, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import axios from "axios";
import styles from "../styles/venueItem.module.css";

function VenueListConainer({ isAdmin }) {
  const { t } = useTranslation();
  const [venueList, setVenueList] = useState([]);

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const url = `${process.env.NEXT_PUBLIC_API_ROOT}/api/v1/stadium/stadium-list/`;
        const headers = {
          "Accept": "application/json",
          "Authorization": `Bearer ${accessToken}`, // Replace 'YOUR_ACCESS_TOKEN' with the actual access token
        };

        const venusList = await axios.post(url, null, { headers })
          .then(response => {
            console.log("Response:", response.data);
            return response.data.stadium;
          })
          .catch(error => {
            console.error("Error:", error.message);
          });
        setVenueList(venusList);
      } catch (error) {
        throw new Error(error);
      }
    };
    fetchVenues();
  }, []);

  return (
    <Container>
      <Row>
        <Col className="text-center text-3xl">
          <h1>{t("Venue")}</h1>
        </Col>
      </Row>
      <div
        className="grid gap-4 mt-5"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gridAutoRows: "1fr",
          justifyContent: "start",
          gap: "1vw",
        }}
      >
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
      </div>
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
            // width={500}
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
      className={`self-stretch ${styles.addVenueItem}`}
      href="/admin/newVenue"
    >
      <LiaPlusSolid size={40} />
      <text>{t("Click to add a venue")}</text>
    </Link>
  );
}

export default VenueListConainer;

import { useState, useEffect } from "react";
import Image from "next/image";
import { IoPeople } from "react-icons/io5";
import { RxBorderAll } from "react-icons/rx";
import { LiaPlusSolid } from "react-icons/lia";
import Link from "next/link";
import { Container, Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import styles from "../styles/venueItem.module.css";
import { mockVenueList } from "../../mockData/mockData";

function VenueListConainer({ isAdmin }) {
  const { t } = useTranslation();
  const [venueList, setVenueList] = useState([]);

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        // TODO:
        // const response = await fetch('/stadium/list');
        // const data = await response.json();
        // setVenues(data);
        const data = mockVenueList;
        setVenueList(data);
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
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gridAutoRows: "1fr"

        }}
      >
        {venueList.map((venue) => (
          <VenueItem
            index={venue.index}
            name={venue.name}
            imgUrl={venue.imgUrl}
            space={venue.space}
            userCount={venue.userCount}
            userMax={venue.userMax}
            isAdmin={isAdmin}
          />
        ))}
        {isAdmin && <AddVeuneItem />}
      </div>
    </Container>
  );
}

function VenueItem({
  index,
  name,
  imgUrl,
  space,
  userCount,
  userMax,
  isAdmin
}) {
  const { t } = useTranslation();
  const router = useRouter();

  const handleEditClick = () => {
    // Redirect to the edit page with the corresponding venue index
    router.push(`/admin/editVenue?venue=${index}`);
  };

  const handleRentClick = () => {
    router.push(`/main/venue?venue=${index}`);
  };

  return (
    <div className="bg-white rounded-xl shadow m-2">
      <div className="relative">
        <div className="bg-black rounded-t-xl">
          <Image
            src={imgUrl}
            alt="Venue Image"
            width={500}
            height={300}
            className="opacity-40 rounded-t-xl"
          />
        </div>

        <div className={styles.absoluteCenter}>
          <p className="text-xl text-white text-center">{t("Sport Center")}</p>
          <p className="text-2xl text-white text-center">{t(name)}</p>
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
              {space}
              {" "}
              {t("Square Meter")}
            </text>
          </div>
          <div className="flex flex-row items-center">
            {isAdmin && (
              <button onClick={handleEditClick} className={styles.rentLink}>
                {t("修改")}
              </button>
            )}
            {!isAdmin &&
              <button onClick={handleRentClick} className={styles.rentLink}>
                {t("Rent")}
              </button>
            }
          </div>
        </div>
      </div>
    </div>

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

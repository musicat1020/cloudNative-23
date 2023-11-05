import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from '../styles/venueItem.module.css';
import { IoPeople } from 'react-icons/io5';
import { RxBorderAll } from 'react-icons/rx';
import { LiaPlusSolid } from 'react-icons/lia';
import Link from 'next/link';
import { Container, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { mockVenueList } from '../../mockData/mockData';

const VenueListConainer = ({ isAdmin }) => {
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
                console.error(error);
            }
        };
        fetchVenues();
    }, []);

    return (
        <Container>
            <Row>
                <Col className="text-center text-3xl">
                    <h1>{t('Venue')}</h1>
                </Col>
            </Row>
            <div className='grid gap-4 m-5'
                style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, auto))', }}
            >
                {venueList.map((venue, index) => (
                    <VenueItem
                        key={index}
                        name={venue.name}
                        imgUrl={venue.imgUrl}
                        space={venue.space}
                        userCount={venue.userCount}
                        userMax={venue.userMax}
                    />
                ))}
                {isAdmin && (<AddVeuneItem />)}
            </div>
        </Container>
    );
};

const VenueItem = ({ name, imgUrl, space, userCount, userMax }) => {
    const { t } = useTranslation();

    return (
        <div className="bg-white rounded-xl shadow">
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
                    <p className="text-xl text-white text-center">{t('Sport Center')}</p>
                    <p className="text-2xl text-white text-center">{t(name)}</p>
                </div>

                <div class="flex flex-row justify-between m-3 px-2">
                    <div className='flex flex-row space-x-1  items-center'>
                        <IoPeople />
                        <text>{userCount}/{userMax}</text>
                    </div>
                    <div className='flex flex-row space-x-2 items-center'>
                        <RxBorderAll />
                        <text>{space} {t('Square Meter')}</text>
                    </div>
                    <div className='flex flex-row items-center'>
                        <Link
                            href="/main/venue"
                            style={{ position: "relative", zIndex: 1 }}
                        >{t('Rent')}</Link>
                    </div>
                </div>
            </div>
        </div >


    );
}

const AddVeuneItem = () => {
    const { t } = useTranslation();

    return (
        <Link
            className={styles.addVenueItem}
            href={"/admin/add-venue"}
        >
            <LiaPlusSolid size={40} />
            <text>{t('Click to add a venue')}</text>
        </Link>
    )
}

export default VenueListConainer;
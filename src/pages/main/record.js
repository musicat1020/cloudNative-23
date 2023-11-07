import Head from 'next/head';
import { Container } from 'react-bootstrap';
import NavBar from '../../components/navbar';
import { useTranslation } from 'next-i18next';
import RecordTab from '@/components/recordTab';
import styles from '@/styles/record.module.css';

const Record = () => {
    const { t } = useTranslation();;

    return (
        <>
            <Head>
                <title>{t('Stadium Matching System')}</title>
                <meta
                    property="og:description"
                    content="Stadium Matching System"
                />
            </Head>
            <NavBar />
            <Container className={styles.container}>
                <RecordTab />
            </Container>
        </>
    );
};

export default Record;
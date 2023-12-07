// UserMenu.js
import { useState } from "react";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { Nav } from "react-bootstrap";
import styles from "../styles/navbar.module.css";
import { getIsProvider } from "../utils/cookies";

function UserMenu({ data, signOut, expanded }) {
    const { t } = useTranslation();
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const isProvider = getIsProvider() === "true";

    const handleButtonClick = () => {
        setDropdownVisible(!isDropdownVisible);
    };

    const handleLinkClick = () => {
        setDropdownVisible(false);
    };


    return (
        <>
            <div className="relative group flex justify-end justify-items-end">
                <button className="relative" onClick={handleButtonClick}>
                    {/* {expanded && <span className={styles.navLink}>{data.user.name}</span>} */}
                    {!expanded && <Image
                        src={data.user.picture}
                        alt={`${data.user.name} photo`}
                        width={50}
                        height={50}
                        className={`rounded-full object-cover h-10 w-10 ${isDropdownVisible ? "ring-1 ring-dark-blue ring-offset-2 ring-offset-cream" : ""}`}
                    />}
                </button>
                {isDropdownVisible && !expanded && (
                    <div className="absolute right-0 shadow-md top-12 bg-white p-2 rounded-md">
                        <div className="flex flex-col justify-center items-center">
                            {!isProvider && (
                                <Nav.Link href="/main/records" className={styles.manageList} onClick={handleLinkClick}>
                                    {t("Records")}
                                </Nav.Link>
                            )}
                            <button className={styles.manageList} onClick={() => signOut()}>
                                {t("Logout")}
                            </button>
                        </div>
                    </div>
                )}
            </div>
            {expanded && !isProvider && (
                <Nav.Link href="/main/records" className={styles.navLink} onClick={handleLinkClick}>
                    {t("Records")}
                </Nav.Link>)
            }
            {expanded && (
                <button className={styles.navLink} onClick={() => signOut()}>
                    {t("Logout")}
                </button>)
            }
        </>
    );
}

export default UserMenu;

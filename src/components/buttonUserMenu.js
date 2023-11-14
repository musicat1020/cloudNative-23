// UserMenu.js
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { Nav } from "react-bootstrap";
import styles from "../styles/navbar.module.css";

function UserMenu({ data, isDropdownVisible, handleMouseEnter, handleMouseLeave, signOut }) {
    const { t } = useTranslation();

    return (
        <div className="relative group flex justify-end" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <button className="relative">
                <Image
                    src={data.user.image}
                    alt={`${data.user.name} photo`}
                    width={50}
                    height={50}
                    className={`rounded-full object-cover h-10 w-10 ${isDropdownVisible ? "ring-1 ring-dark-blue ring-offset-2 ring-offset-cream" : ""}`}
                />
            </button>
            <div className={`absolute right-0 shadow-md top-12 bg-white p-2 rounded-md ${isDropdownVisible ? "" : "hidden"}`}>
                <div className="flex flex-col justify-center items-center">
                    <Nav.Link href="/main/records" className={styles.manageList}>
                        {t("Records")}
                    </Nav.Link>
                    <button className={styles.manageList} onClick={signOut}>
                        {t("Logout")}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default UserMenu;

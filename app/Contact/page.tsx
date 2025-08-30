import React from "react";
import ConnectUs from "../../components/landing/contactUs/ConnectUs";
import ContactInfo from "../../components/landing/contactUs/ContactInfo";
import BannerSection from "@/components/newAboutUs/BannerSection";

const page = () => {
    return (
        <>
            <BannerSection
                title="Contact Us"
                breadcrumbs={[
                    { name: "Home", path: "/" },
                    { name: "Contact Us", path: "/Contact", active: true },
                ]}
            >
                Have a question or need guidance? Our experts are here to help
                you choose the perfect gem with confidence.
            </BannerSection>
            <ConnectUs />
            {/* <ContactInfo /> */}
        </>
    );
};

export default page;

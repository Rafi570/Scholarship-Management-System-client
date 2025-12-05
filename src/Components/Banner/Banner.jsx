import React from 'react';

const ScholarshipBanner = () => {
    // Note: The Tailwind configuration and custom CSS are assumed to be
    // set up in your React project (e.g., in index.css or via a global config).
    // The classes 'primary', 'background-light', 'background-dark', and 'display'
    // are based on the custom config provided in the HTML.

    return (
        <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
            <div className="layout-container flex h-full grow flex-col">
                <div className="flex flex-1 justify-center">
                    <div className="layout-content-container flex flex-col w-full flex-1">
                        <div className="@container">
                            {/* The main banner section */}
                            <div
                                className="flex min-h-[480px] md:min-h-screen flex-col gap-6 bg-cover bg-center bg-no-repeat items-center justify-center p-4 text-center"
                                data-alt="Panoramic photograph of a young male student sitting outdoors on a university campus, looking thoughtfully into the distance with books by his side."
                                style={{
                                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.5) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuDjc_Mvm7KeWPGJEtBvxxQWo5HRB5rhC6bjH3kFhpeLiHpEVJI9Qd_CKuhbcEhsp5JFS6B7JjQBOQ6sEnc-YjZJZc1hcpU46skigsUYY5jRSslW8Ll_5UPxixso9GmIPfPGR48QHdux3h_qVqxXa4VeMuBTsahz842hHb8LJ6PjMz54MhXUBHmDyovNGi8eXZVwpL1mx6gg_6XRGMSnWoL78949LQqH8CbUo2fm_FF9p1v-xgdRGMlUDPntag1t91xblKB2beyrBNI")`,
                                }}
                            >
                                <div className="flex flex-col gap-4 max-w-3xl">
                                    <h1 className="text-white text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                                        Unlock Your Potential with Scholarships
                                    </h1>
                                    <h2 className="text-white/90 text-base font-normal leading-normal sm:text-lg">
                                        Search thousands of scholarships to fund your college education. Find your perfect match today.
                                    </h2>
                                </div>
                                <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-primary text-background-dark text-base font-bold leading-normal tracking-wide hover:bg-primary/90 focus:outline-none focus:ring-4 focus:ring-primary/50 transition-colors">
                                    <span className="truncate">Search Scholarships</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ScholarshipBanner;
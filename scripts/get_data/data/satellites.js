/*
Satellites.js Data Documentation

satellites: array of satellite objects

Available Data Points: (*=required for object)
id*         (integer)                       : ID of the satellite, should be unique, ideally new IDs have not been used before; original IDs continuous, 1-indexed
name*       (string)                        : name of the satellite
price*      (integer)                       : price of the satellite (EUR)
size*       (integer)                       : size of the satellite (in U), see https://www.cubesat.org/cubesatinfo for specifications
desc_short* (string)                        : short description of the satellite
desc_long*  (string)                        : long description of the satellite
image*      (string)                        : link to image; either local (starting from ./app)
mode        (string[real/inspired/dummy])   : real=satellite is real and can be purchased; inspired: inspired by a real satellite; dummy: satellite is completely made up
sat_source  (string[LINK])                  : LINK to real source if mode="real" or mode="inspired"
im_source   (string["real"/"dummy"])        : "real" if image is the actual image of the satellite, "dummy" if not
im_org_url  (string[LINK])                  : Web-URL to the original image if im_source="real"

Additional Information:
1. for legal information that applies on this page, check legal.html
2. Some of these Descriptions are AI-generated with ChatGPT

*/


const satellites = [
    {
        id: 1,
        name: "KRATOS 1U Cubesat Platform",
        price: 44000,
        size: 1,
        mass: 0.5,
        desc_short: "Ready to-use 1U Cubesat Platform with Solar Arrays",
        desc_long: "The KRATOS SCB is completely configurable:  From a modest, standard cubesat to a powerful SpaceTaxi in a 1U that can host up to 6 standard payload boards and 3 cameras delivering up to 100W of power, and LASER communications at 10Mbps. it has everything needed to fly: Onboard computer with pre-installed libraries, SDR Radio with integrated power amplifier, a powerful EPS with 4 power rails, UMPPT Solar management couple to a fast battery charger, Deployable Multifunction Solar Arrays, automated deploy/release control to up to 4 devices, embedded monopole and dipole antennas from  VHF to L band, embedded magnetorquers, temperature and sun sensors in all walls, ADCS control with integrated Z axis magnetorquer, high power batteries, radiation hardened SSD storage and even LASER communications at 10Mbps minimum.",
        image: "/assets/images/satellites/kratos_1u_cubesat_platform.jpg",
        mode: "real",
        sat_source: "https://www.cubesat.market/kratos1uplatform",
        im_source: "real",
        im_org_url: "https://static.wixstatic.com/media/4249fe_9c5689db44934412961068f5a1f8434b~mv2.jpg/v1/fit/w_1000,h_1000,q_90/4249fe_9c5689db44934412961068f5a1f8434b~mv2.jpg"
    },
    {
        id: 2,
        name: "Endurosat 1U Cubesat Platform",
        price: 55800,
        size: 1,
        mass: 0.85,
        desc_short: "Flight-proven fully integrated CubeSat bus with unmatched payload capacity in the 1U class",
        desc_long: "Embark on a journey of innovation with the Endurosat 1U Cubesat Platform. This flight-proven, fully integrated CubeSat bus offers unmatched payload capacity within its compact 1U form factor. Designed for versatility and reliability, it's the perfect choice for a wide range of space missions. Explore new horizons and push the boundaries of space exploration with the Endurosat 1U Cubesat Platform.", //AI-generated
        image: "/assets/images/satellites/endurosat_1u_cubesat_platform.webp",
        mode: "real",
        sat_source: "https://www.endurosat.com/cubesat-store/cubesat-platforms/1u-cubesat-platform/",
        im_source: "real",
        im_org_url: "https://www.endurosat.com/wp-content/uploads/2020/11/1u-cubesat-platform-endurosat-nanosatellite-cropped-01-min-1024x1024-1.webp"
    },
    {
        id: 3,
        name: "Endurosat 1.5U Cubesat Platform",
        price: 58900,
        size: 1.5,
        mass: 1.05,
        desc_short: "Flight-proven fully integrated CubeSat buswith 30% more volume",
        desc_long: "Step into a world of expanded possibilities with the Endurosat 1.5U Cubesat Platform. Blending the compact size of a 1U CubeSat with 30% more volume, this platform redefines what's achievable in space exploration. Its flight-proven design and advanced capabilities make it the perfect choice for a wide range of missions, from scientific endeavors to Earth observation projects. With its adaptable nature and reliable performance, the Endurosat 1.5U Cubesat Platform opens doors to new horizons in satellite technology.", //AI-generated
        image: "/assets/images/satellites/endurosat_1_5u_cubesat_platform.webp",
        mode: "real",
        sat_source: "https://www.endurosat.com/products/1-5u-platform/",
        im_source: "real",
        im_org_url: "https://www.endurosat.com/wp-content/uploads/2024/03/1.5U-Platform-web-3-1330x660.webp"
    },
    {
        id: 4,
        name: "Endurosat 3U Cubesat Platform",
        price: 263900,
        size: 3,
        mass: 3.5,
        desc_short: "Multi-purpose platform capable of supporting wide range of pointing, volume and power requirements",
        desc_long: "Empower your mission with the Endurosat 3U Cubesat Platform. Offering unmatched versatility, this multi-purpose platform is designed to meet a diverse range of pointing, volume, and power requirements. Whether you're conducting scientific experiments, Earth observation missions, or technology demonstrations, the Endurosat 3U Cubesat Platform provides the flexibility and reliability you need to succeed in space exploration endeavors. With its advanced systems and components, it's the perfect choice for pushing the boundaries of small satellite missions and unlocking new possibilities in space.", //AI-generated
        image: "/assets/images/satellites/endurosat_3u_cubesat_platform.webp",
        mode: "real",
        sat_source: "https://www.endurosat.com/products/3u-platform/",
        im_source: "real",
        im_org_url: "https://www.endurosat.com/wp-content/uploads/2024/03/3U-Platform-web-16-1330x660.webp"
    },
    {
        id: 5,
        name: "Endurosat 6U Cubesat Platform",
        price: 320000,
        size: 6,
        mass: 4.8,
        desc_short: "High-performance platform, easily adaptable to handle complex Earth Observation, IoT, science, and exploration missions",
        desc_long: "Elevate your missions to new heights with the Endurosat 6U Cubesat Platform. Engineered for high-performance and adaptability, this platform is ready to tackle complex Earth Observation, IoT, science, and exploration missions with ease. With its advanced capabilities and seamless integration, it's the perfect choice for unlocking the full potential of your space endeavors and achieving success in the cosmos.", //AI-generated
        image: "/assets/images/satellites/endurosat_6u_cubesat_platform.webp",
        mode: "real",
        sat_source: "https://www.endurosat.com/products/6u-xl-platform/",
        im_source: "real",
        im_org_url: "https://www.endurosat.com/wp-content/uploads/2024/03/6U-Platform-web-34-1330x660.webp"
    },
    {
        id: 6,
        name: "Endurosat 8U Cubesat Platform",
        price: 382000,
        size: 8,
        mass: 5.2,
        desc_short: "High-performance platform, easily adaptable to handle complex Earth Observation, communication, and science missions. Multiple payloads capacity",
        desc_long: "Enter the era of cutting-edge space missions with the Endurosat 8U Cubesat Platform. Engineered with state-of-the-art propulsion systems, including advanced ion thrusters for precise maneuverability, this platform ensures unparalleled control in the cosmos. Its modular design accommodates a myriad of payload configurations, from high-resolution imaging arrays to next-generation communication transponders, enabling a wide range of scientific and commercial applications. With integrated radiation shielding and fault-tolerant computing systems, the Endurosat 8U Cubesat Platform guarantees mission success in even the harshest space environments.", //AI-generated
        image: "/assets/images/satellites/endurosat_8u_cubesat_platform.webp",
        mode: "real",
        sat_source: "https://www.endurosat.com/products/8u-platform/",
        im_source: "real",
        im_org_url: "https://www.endurosat.com/wp-content/uploads/2024/03/8U-Platform-web-1-1330x660.webp"
    },
    {
        id: 7,
        name: "Endurosat 12U Cubesat Platform",
        price: 395000,
        size: 12,
        mass: 6,
        desc_short: "A High-performance NanoSat platform, easily adaptable to handle complex missions",
        desc_long: "Embark on ambitious space missions with the Endurosat 12U Cubesat Platform. Engineered for versatility and reliability, this platform offers a spacious payload capacity and advanced systems for complex mission requirements. Equipped with precision propulsion modules and advanced attitude control systems, it ensures precise maneuverability and stable operations in orbit. With its modular architecture and customizable configurations, the Endurosat 12U Cubesat Platform is the perfect choice for pushing the boundaries of space exploration and achieving your mission objectives with confidence.", //AI-generated
        image: "/assets/images/satellites/endurosat_12u_cubesat_platform.webp",
        mode: "real",
        sat_source: "https://www.endurosat.com/products/12u-platform/",
        im_source: "real",
        im_org_url: "https://www.endurosat.com/wp-content/uploads/2024/03/12U-Platform-web-8-1330x660.webp"
    },
    {
        id: 8,
        name: "Endurosat 16U Cubesat Platform",
        price: 420000,
        size: 16,
        mass: 10,
        desc_short: "The highest performance platform of EnduroSat, easily adaptable to handle complex Earth Observation, IoT, science, and exploration missions",
        desc_long: "Experience boundless possibilities with our largest platform yet—the Endurosat 16U Cubesat Platform. Offering unparalleled space and versatility, this platform redefines the boundaries of small satellite missions. With its expansive layout and advanced systems, including high-capacity power management and precise attitude control, it empowers you to undertake the most ambitious space exploration projects with confidence. From Earth observation to deep space missions, the Endurosat 16U Cubesat Platform is your gateway to the stars.", //AI-generated
        image: "/assets/images/satellites/endurosat_16u_cubesat_platform.webp",
        mode: "real",
        sat_source: "https://www.endurosat.com/cubesat-store/cubesat-platforms/16u-cubesat-platform/",
        im_source: "real",
        im_org_url: "https://www.endurosat.com/wp-content/uploads/2023/08/16u-cubesat-platform-endurosat-nanosatellite-1-min.webp"
    },
    {
        id: 9,
        name: "IOS CubeSat Kit 2.0",
        price: 22000,
        size: 1,
        mass: 0.5,
        desc_short: "Space-tested satellite kit for academia or business.",
        desc_long: "The IOS CubeSat Kit is currently the lowest-cost professional-quality CubeSat Kit on the planet. It is assembled with high-quality, custom-printed circuit boards and precision laser-cut aluminum components. CubeSat kit builders include engineering or science professionals who wish to space-qualify hardware in Low Earth Orbit, educational institutions requiring student training in spacecraft design, and experimenters who just want a chance to explore space. The CubeSat can also serve as a Personal Satellite for artists, musicians, advertisers, ,generics or individuals who wish to send items into space, or to transmit messages from space. If required, and for extra fees based on mission requirements, Interorbital Systems and its partners can offer design, development, training, and manufacturing services to individuals who do no possess the technical skills required to build the spacecraft. The first completed IOS CubeSat Kit 1.0 was launched into orbit by India's PSLV launch vehicle in 2019. This IOS CubeSat Kit, the KalamSAT V2, was assembled by Space Kidz India.",
        image: "/assets/images/satellites/IOS_cubesat_kit_2.jpg",
        mode: "real",
        sat_source: "https://www.interorbital.com/Cubesat%20Kits.php",
        im_source: "real",
        im_org_url: "https://www.interorbital.com/Images/Cube%20Sat%202.0%20Photo_1.jpg"
    },
    {
        id: 10,
        name: "C3S Electronics Development - 12U platform",
        price: 300000,
        size: 12,
        mass: 18,
        desc_short: "the perfect platform for large payloads.",
        desc_long: "C3S's main strength in the small satellite industry is that our engineering team devoted great attention on thermal design during the development of our platform. Therefore, the structure is optimized for high dissipation density and thermo-elasticity, both payload and platform wise. Along unprecedentedly high payload power availability our bus offers great flexibility regarding the shape and positioning of the payload. Our devoted team will be at your service from mission planning throughout the operation of the entire mission, until deorbiting.",
        image: "/assets/images/satellites/c3s_ed_12u_cubesat.jpg",
        mode: "real",
        sat_source: "https://catalog.orbitaltransports.com/12u-platform-c3s/#",
        im_source: "real",
        im_org_url: "https://cdn11.bigcommerce.com/s-uuk5gaaahj/images/stencil/1280x1280/products/1022/905/12U_platform2__29192.1614618252.jpg?c=2&imbypass=on"
    },
    {
        id: 11,
        name: "NearSpace Launch - 1U FastBus",
        price: 30000,
        size: 1,
        mass: 0.7,
        desc_short: "Low Cost, 100% FastBus On-Orbit Success,",
        desc_long: "Low Cost, 100% FastBus On-Orbit Success, Real-Time Global Data, Fast Delivery, FastBus TRL 9, Customizable, Compliant with new FCC requirements.\n Includes: Rigid Structure, Advanced EPS, Simplex/Duplex Comm, Solar Arrays, Sensors, ADCS, Online Ground Station, & Processor.",
        image: "/assets/images/satellites/near_space_launch_1u_fast_bus.webp",
        mode: "real",
        sat_source: "https://catalog.orbitaltransports.com/fastbus-1u/#",
        im_source: "real",
        im_org_url: "https://cdn11.bigcommerce.com/s-uuk5gaaahj/images/stencil/1280x1280/products/928/609/1U_fastbus__53589.1599582171.PNG?c=2&imbypass=on"
    },
    {
        id: 12,
        name: "CubeSat Kit™",
        price: 15000,
        size: 1,
        mass: 0.6,
        desc_short: "Easy to use cubesat kit with 1U size.",
        desc_long: " Compared to traditional multi-million-dollar satellite missions, CubeSat projects have the potential to educate the participants and implement successful and useful missions in science and industry at much lower costs. CubeSat payloads and experiments are often new and unique, and project timelines are typically 9-24 months from inception to launch. Since launch opportunties are scheduled well in advance, it's critically important that a CubeSat project adhere to its schedules and stay on time and under budget. CubeSat missions still require considerable planning and many man-hours of work to maximize the chances for success. By employing as much standardization as possible you can concentrate on your project's mission-specific goals. By making use of as many off-the-shelf commercial and freely available tools and components in the construction of the nanosatellite, you'll save time and money. Through its comprehensive and flexible hardware and software design, Pumpkin's space-proven CubeSat Kit will help achieve success in your CubeSat mission. Now in its fourth generation and with over 150 delivered to customers since 2003, Pumpkin's CubeSat Kit is the defacto standard in the CubeSat universe, with compatible product offerings from Pumpkin and third parties.",
        image: "/assets/images/satellites/CubeSatKit_1u.jpg",
        mode: "real",
        sat_source: "http://www.cubesatkit.com/",
        im_source: "real",
        im_org_url: "http://www.cubesatkit.com/images/ITU-pSAT1-small.jpg"
    }
]

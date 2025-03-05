// import { useSession } from "next-auth/react";
// import { useEffect, useState } from "react";

// interface UserData {
//   nameAndLastName: string;
// }

// export default function Profile() {
//   const { data: session } = useSession();
//   const [userData, setUserData] = useState<UserData | null>(null);

//   useEffect(() => {
//     if ((session as any)?.accessToken) {
//       fetch( `${process.env.NEXT_PUBLIC_API_URL}/auth/signin`, {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${(session as any).accessToken}`,
//         },
//       })
//         .then((res) => res.json())
//         .then((data) => setUserData(data))
//         .catch((err) => console.error("Error:", err));
//     }
//   }, [session]);

//   return (
//     <div>
//       <h1>Bienvenido, {userData?.nameAndLastName || session?.user?.name}</h1>
//       <img src={session?.user?.image!} alt="Avatar" />
//     </div>
//   );
// }

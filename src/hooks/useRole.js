import { useEffect, useState } from "react";
import useAuth from "../AuthContext/useAuth";

const useRole = () => {
  const { user } = useAuth();
  const [role, setRole] = useState("user");
  const [premium, setPremium] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3100/lesson-users/role?email=${user.email}`)
        .then(res => res.json())
        .then(data => {
          setRole(data.role);
          setPremium(data.premium);
          setLoading(false);
        })
        .catch(() => setLoading(false)); // prevent spinner hang if fetch fails
    } else {
      setLoading(false);
    }
  }, [user]);

  return { role, premium, loading };
};

export default useRole;

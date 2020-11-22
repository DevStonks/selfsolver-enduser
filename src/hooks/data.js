import { useContext, useEffect, useState } from "react";
import AuthContext from "../contexts/AuthContext";
import AppContext from "../contexts/AppContext";
import ApiService from "../services/ApiService";

const loadData = (getter, setter, setError, setLoading, logout) => () => {
  getter()
    .then((response) => {
      setLoading(false);
      setter(response.data);
    })
    .catch((err) => {
      if (err?.response?.status === 401) {
        return logout();
      }
      setLoading(false);
      setError(err);
    });
};

const useData = (getter, setter) => {
  const { logout } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(loadData(getter, setter, setError, setLoading, logout), []);
  return [loading, error];
};

export const useDefects = () => {
  const { defects, setDefects } = useContext(AppContext);
  const [loading, error] = useData(ApiService.getDefects, setDefects);
  return [defects, loading, error];
};

export const useDevices = () => {
  const { devices, setDevices } = useContext(AppContext);
  const [loading, error] = useData(ApiService.getDevices, setDevices);
  return [devices, loading, error];
};

export const useTickets = () => {
  const { tickets, setTickets } = useContext(AppContext);
  const [loading, error] = useData(ApiService.getTickets, setTickets);
  return [tickets, loading, error];
};

export const useSolutions = (ticketId) => {
  const [solutions, setSolutions] = useState([]);
  const [loading, error] = useData(
    () => ApiService.getSolutions(ticketId),
    setSolutions
  );
  return [solutions, loading, error];
};

export default useData;

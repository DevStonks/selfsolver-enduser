import { useContext, useEffect, useState } from "react";
import AppContext from "../contexts/AppContext";
import ApiService from "../services/ApiService";

const loadData = (getter, setter, setError, setLoading) => () => {
  getter()
    .then((response) => {
      setLoading(false);
      setter(response.data);
    })
    .catch((err) => {
      setLoading(false);
      setError(err.message);
    });
};

const useData = (getter, setter) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(loadData(getter, setter, setError, setLoading), []);
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

export default useData;

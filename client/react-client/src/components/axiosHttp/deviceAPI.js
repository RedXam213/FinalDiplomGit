import { $authHost, $host } from "./index";
import { jwtDecode } from "jwt-decode";

export const createType = async (type) => {
  const { data } = await $authHost.post("api/type", type);
  return data;
};

export const getTypes = async () => {
  const { data } = await $host.get("api/type");
  return data;
};

export const createBrand = async (brand) => {
  const { data } = await $authHost.post("api/brand", brand);
  return data;
};

export const getBrands = async () => {
  const { data } = await $host.get("api/brand");
  return data;
};

export const createDevice = async (device) => {
  const { data } = await $authHost.post("api/device", device);
  return data;
};

export const getDevices = async (
  typeId,
  brandIds,
  page,
  limit,
  searchQuery,
  minPrice,
  maxPrice,
  sortOrder
) => {
  const params = { typeId, page, limit };

  if (brandIds && brandIds.length > 0) {
    params.brandId = brandIds.join(",");
  }
  if (searchQuery) {
    params.name = searchQuery;
  }
  if (minPrice) {
    params.minPrice = minPrice;
  }
  if (maxPrice) {
    params.maxPrice = maxPrice;
  }
  if (sortOrder) {
    params.sortOrder = sortOrder;
  }

  const { data } = await $host.get("api/device", { params });
  return data;
};


export const getOneDevices = async (id) => {
  const { data } = await $host.get("api/device/" + id);
  return data;
};

export const getBrandsByType = async (typeId) => {
  const { data } = await $host.get("api/brand/byType", { params: { typeId } });
  return data;
};

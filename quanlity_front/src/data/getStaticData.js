import divisionData from './division.json';

// get district in HA NOI
export const districtNames = divisionData[0].districts.map((division) => division.name);

// Truy cập trực tiếp bằng cú pháp dấu chấm
export const findWard = (district = 'ba đình') => {
    return divisionData[0].districts.find((division) => division.name === district);
};

export const port = 'http://localhost:8102/api/v1';

// eslint-disable
// this is an auto generated file. This will be overwritten

export const getPatient = `query GetPatient($id: ID!) {
  getPatient(id: $id) {
    id
    anonId
    measurements {
      items {
        id
        type
        date
        abi_before
        abi_after
        nirs_before
        nirs_after
        endo_de
        endo_in
        nirs_gastroc_before
        nirs_gastroc_after
        notes
      }
      nextToken
    }
  }
}
`;
export const listPatients = `query ListPatients(
  $filter: ModelPatientFilterInput
  $limit: Int
  $nextToken: String
) {
  listPatients(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      anonId
      measurements {
        nextToken
      }
    }
    nextToken
  }
}
`;
export const getMeasurement = `query GetMeasurement($id: ID!) {
  getMeasurement(id: $id) {
    id
    type
    patient {
      id
      anonId
      measurements {
        nextToken
      }
    }
    date
    abi_before
    abi_after
    nirs_before
    nirs_after
    endo_de
    endo_in
    nirs_gastroc_before
    nirs_gastroc_after
    notes
  }
}
`;
export const listMeasurements = `query ListMeasurements(
  $filter: ModelMeasurementFilterInput
  $limit: Int
  $nextToken: String
) {
  listMeasurements(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      type
      patient {
        id
        anonId
      }
      date
      abi_before
      abi_after
      nirs_before
      nirs_after
      endo_de
      endo_in
      nirs_gastroc_before
      nirs_gastroc_after
      notes
    }
    nextToken
  }
}
`;

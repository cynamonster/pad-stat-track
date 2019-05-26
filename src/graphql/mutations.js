// eslint-disable
// this is an auto generated file. This will be overwritten

export const createPatient = `mutation CreatePatient($input: CreatePatientInput!) {
  createPatient(input: $input) {
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
export const updatePatient = `mutation UpdatePatient($input: UpdatePatientInput!) {
  updatePatient(input: $input) {
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
export const deletePatient = `mutation DeletePatient($input: DeletePatientInput!) {
  deletePatient(input: $input) {
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
export const createMeasurement = `mutation CreateMeasurement($input: CreateMeasurementInput!) {
  createMeasurement(input: $input) {
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
export const updateMeasurement = `mutation UpdateMeasurement($input: UpdateMeasurementInput!) {
  updateMeasurement(input: $input) {
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
export const deleteMeasurement = `mutation DeleteMeasurement($input: DeleteMeasurementInput!) {
  deleteMeasurement(input: $input) {
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

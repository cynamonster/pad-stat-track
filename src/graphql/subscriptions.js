// eslint-disable
// this is an auto generated file. This will be overwritten

export const onCreatePatient = `subscription OnCreatePatient {
  onCreatePatient {
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
export const onUpdatePatient = `subscription OnUpdatePatient {
  onUpdatePatient {
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
export const onDeletePatient = `subscription OnDeletePatient {
  onDeletePatient {
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
export const onCreateMeasurement = `subscription OnCreateMeasurement {
  onCreateMeasurement {
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
export const onUpdateMeasurement = `subscription OnUpdateMeasurement {
  onUpdateMeasurement {
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
export const onDeleteMeasurement = `subscription OnDeleteMeasurement {
  onDeleteMeasurement {
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

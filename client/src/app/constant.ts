export const ENVIRONMENT = ['E5','E6','E7'];
export const CASES=['Ortho','Restorative']

export const getModelType = (caseType)=> {
    switch (caseType){
        case 'Ortho':
            return ['Invisalign1','Invisalign2']
        case 'Restorative':
            return ['Resto1','Resto2']
    }
} 
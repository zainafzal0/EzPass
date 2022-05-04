export const signIn = (id,name,isLoggedIn) => {
    return {
        type: 'SIGN_IN',
        id: id,
        name: name,
        isLoggedIn: isLoggedIn
    }
}
export const signOut = (id,name,isLoggedIn) => {
    return {
        type: 'SIGN_OUT',
        id: id,
        name: name,
        isLoggedIn: isLoggedIn
    }
}
export const setIndex = (index) => {
    return {
        type: 'SET_INDEX',
        index: index
    }
}



//Use Reducer Actions **NOT REDUX** for Password Page
export const resetAllData = () => {
    return {
        type: 'RESET_DATA',
    }
}
export const editData1 = (data) => {
    return {
        type: 'CHANGE_DATA_1',
        data: data
    }
}
export const editData2 = (data) => {
    return {
        type: 'CHANGE_DATA_2',
        data: data
    }
}
export const editData3 = (data) => {
    return {
        type: 'CHANGE_DATA_3',
        data: data
    }
}
export const editData4 = (data) => {
    return {
        type: 'CHANGE_DATA_4',
        data: data
    }
}
export const editData5 = (data) => {
    return {
        type: 'CHANGE_DATA_5',
        data: data
    }
}











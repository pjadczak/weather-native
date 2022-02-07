import { ADD_DATA_WAEATHER, SET_CURRENT, SET_CURRENT_NOW, SET_GPS_PERISSION, SET_LOCATION_NAME, SET_LANG, SET_POSITION, SET_FULL_STATE } from './types';

export const addData = (position: object, actualCity: object, dataType: String, dataWeather: object, dayIndex?: number) => (
    {
      type: ADD_DATA_WAEATHER,
      payload: { position, dataWeather, actualCity, dataType, dayIndex: dayIndex>=0 ? dayIndex : null },
    }
);

export const setDataCurrent = (dayIndex: number, data: object) => (
    {
      type: SET_CURRENT,
      payload: { dayIndex, data },
    }
);

export const setDataCurrentNow = () => (
  {
    type: SET_CURRENT_NOW
  }
);

export const setGpsPermission = (permission: boolean | null) => (
      {
        type: SET_GPS_PERISSION,
        payload: permission,
      }
);

export const setLocationName = (name: String) => (
      {
        type: SET_LOCATION_NAME,
        payload: name,
      }
);

export const setLang = (langCode: String) => (
      {
        type: SET_LANG,
        payload: langCode,
      }
);

export const setPosition = (position: object) => (
      {
        type: SET_POSITION,
        payload: position,
      }
);

export const setFullState = (state: object) => (
      {
        type: SET_FULL_STATE,
        payload: state,
      }
);
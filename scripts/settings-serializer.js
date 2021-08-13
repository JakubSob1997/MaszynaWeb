
import { ExtentionPresets } from "./enums.js";
import SerializerBase from "./serializer-base.js";
import Settings,{SettingsData} from "./Settings.js";

export default class SettingsSerializer extends SerializerBase{
    

    constructor(_settings){
        super();
        this.settings = _settings;
    }

    getDefault(){

        return SettingsData.getDefault();
    }

    getKeyName(){
        return "settings";
    }

    setObjectData(_settingsData){
        this.settings.setupValues(_settingsData);
    }

    getObjectData(){
        return this.settings.getDataObject();
    }

}


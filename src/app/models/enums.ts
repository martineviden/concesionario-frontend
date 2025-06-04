export enum TipoVehiculo {
  FURGONETA ="FURGONETA",
  COCHE = "COCHE",
  MOTO = "MOTO"
}

export enum Provincia {
  ALAVA="ALAVA", ALBACETE="ALBACETE", ALICANTE="ALICANTE", ALMERIA="ALMERIA", ASTURIAS="ASTURIAS",
	AVILA="AVILA", BADAJOZ="BADAJOZ", BARCELONA="BARCELONA", BURGOS="BURGOS", CACERES="CACERES",
	CADIZ="CADIZ", CANTABRIA="CANTABRIA", CASTELLON="CASTELLON", CIUDADREAL="CIUDADREAL", CORDOBA="CORDOBA",
	LACORUNA="LA_CORUNA", CUENCA="CUENCA", GERONA="GERONA", GRANADA="GRANADA", GUADALAJARA="GUADALAJARA",
	GUIPUZCOA="GUIPUZCOA", HUELVA="HUELVA", HUESCA="HUESCA", BALEARES="BALEARES", JAEN="JAEN",
	LEON="LEON", LERIDA="LERIDA", LUGO="LUGO", MADRID="MADRID", MALAGA="MALAGA",
	MURCIA="MURCIA", NAVARRA="NAVARRA", ORENSE="ORENSE", PALENCIA="PALENCIA", LASPALMAS="LASPALMAS",
	PONTEVEDRA="PONTEVEDRA", LARIOJA="LARIOJA", SALAMANCA="SALAMANCA", SEGOVIA="SEGOVIA", SEVILLA="SEVILLA",
	SORIA="SORIA", TARRAGONA="TARRAGONA", SANTACRUZDETENERIFE="SANTACRUZDETENERIFE", TERUEL="TERUEL", TOLEDO="TOLEDO",
	VALENCIA="VALENCIA", VALLADOLID="VALLADOLID", VIZCAYA="VIZCAYA", ZAMORA="ZAMORA", ZARAGOZA="ZARAGOZA"
}

export enum Combustible {
	GASOLINA ="GASOLINA", DIESEL="DIESEL", GLP="GLP", ELECTRICO="ELECTRICO"
}

export enum Transmision {
  MANUAL="MANUAL", AUTOMATICO="AUTOMATICO"
}

export enum EtiquetaAmbiental {
  CERO="CERO", ECO="ECO", C="C", B="B"
}

export enum Rol {
  CLIENTE="CLIENTE", ADMIN="ADMIN"
}

export namespace Provincia {
  export function keys(): Array<string>{
    let keys = Object.keys(Provincia);
    return keys.slice(0,keys.length-1)
  }
}
export namespace TipoVehiculo {
  export function keys(): Array<string>{
    let keys = Object.keys(TipoVehiculo);
    return keys.slice(0,keys.length-1)
  }
}

  export function tipo(tipo: any, ubicacion: any) {
    throw new Error("Function not implemented.");
  }


export namespace Combustible {
  export function keys(): Array<string>{
    let keys = Object.keys(Combustible);
    return keys.slice(0,keys.length-1)
  }
}
export namespace Transmision {
  export function keys(): Array<string>{
    let keys = Object.keys(Transmision);
    return keys.slice(0,keys.length-1)
  }
}
export namespace EtiquetaAmbiental {
  export function keys(): Array<string>{
    let keys = Object.keys(EtiquetaAmbiental);
    return keys.slice(0,keys.length-1)
  }
}

// Elimina o comenta esto:
// export namespace Rol {
//   export function keys(): Array<string>{
//     let keys = Object.keys(Rol);
//     return keys.slice(0,keys.length-1)
//   }
// }

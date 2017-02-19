var TimeMultiplier : int = 200000;
var Name : String = "";
var Parent : Transform;

enum Orbit {Auto, Manual}
var SetOrbit : Orbit;

enum Rotation {Auto, Manual}
var SetRotation : Rotation;

enum Season {Auto, Manual}
var SetSeason : Season;

var TidalLock : boolean;
var LockOrbit : boolean;
var OrbitAngle : float;
var KeepTime : boolean;
private var ThisTransform : Transform;
private var EarthDays : float = 365.242199;

// Orbit Stats
var OrbitalPeriod : float = 1.0; // Earth Years
var OrbitalDistance : float = 2;
var OrbitOffset : Vector3;
var OrbitPosOffset : float;
var OrbitStartPos : float;
var OrbitYears : int;
var OrbitDays : int;
var OrbitHours : int;
var OrbitMinutes : int;
var OrbitSeconds : float;
private var OrbitalTime : float;
private var OrbitalDegSec : float;

//Rotation Stats
var RotationOffset : float;
var RotationPeriod : float; // Earth Hours
var RotationYears : int;
var RotationDays : int;
var RotationHours : int;
var RotationMinutes : int;
var RotationSeconds : float;
private var RotationDegSec : float;
private var RotationTime : float;

// Planetary Stats
var AxialTilt : float;
var HoursInDay : int;
var RotInOrbit : int;
//Planet Counters
var CounterYear : int;
var CounterDay : int;
var CounterHour : int;
var CounterMinute : int;
var CounterSecond : float;
var CurrentOrbitPos : float;
var OrbitOffSetYear : boolean;
private var RotCounter : float;
private var OrbCounter : float;

//Draw Orbit
var _DrawOrbit : boolean = false;
var DisplaySize : float = 0.05;
var DisplayColor : Color = Color.blue;
var Segments : int = 100;
var DisplayTexture : Texture2D;
var DisplayTiling : int = 50;
var UseTexture : boolean;
private var ThisOrbit : Transform;
private var LR : LineRenderer;

private var OrbitCenter : Transform;

function Awake(){
ThisTransform = transform;
ThisTransform.localEulerAngles.z = AxialTilt;
OrbitCenter = new GameObject("OrbitCenter").transform;
OrbitCenter.position = Parent.position;
ThisTransform.parent = OrbitCenter;
ThisTransform.localPosition = Vector3(0,0,OrbitalDistance);
OrbitCenter.eulerAngles.x = OrbitAngle;
OrbitCenter.Rotate(0,OrbitPosOffset,0);


	if(_DrawOrbit){
		if(GameObject.Find("Orbits") == null){
			var Orbits : GameObject = new GameObject("Orbits");
			Orbits.transform.position = Vector3.zero;
			Orbits.transform.eulerAngles = Vector3.zero;
		}
	}
}

function Start(){
SetupPlanet();

	if(OrbitOffSetYear){
		OrbCounter = OrbitPosOffset;
	}
	if(LockOrbit){
		KeepTime = false;
	}
	if(_DrawOrbit){
		SetupDrawOrbit();
	}
}

function SetupDrawOrbit(){
var Orbit : GameObject = new GameObject("Orbit_Path");
Orbit.transform.eulerAngles.x = OrbitAngle;
Orbit.transform.parent = GameObject.Find("Orbits").transform;
Orbit.transform.position = Parent.position;
Orbit.AddComponent(LineRenderer);
LR = Orbit.GetComponent(LineRenderer);
LR.SetWidth(DisplaySize,DisplaySize);
LR.material.shader = Shader.Find("Particles/Additive");
LR.material.SetColor ("_TintColor", DisplayColor);
LR.useWorldSpace = false;
LR.SetVertexCount (Segments + 1);

	if(DisplayTexture != null){
		LR.material.mainTexture = DisplayTexture;
		LR.material.mainTextureScale.x = DisplayTiling;
	}

ThisOrbit = Orbit.transform;

var Angle : float;
	for (var i : int = 0; i < (Segments + 1); i++){
		var NewRadius : Vector2 = Vector2(	Mathf.Sin (	Mathf.Deg2Rad * Angle) * OrbitalDistance, 
															Mathf.Cos (Mathf.Deg2Rad * Angle) * OrbitalDistance);
		
		LR.SetPosition (i,Vector3(NewRadius.y,0,NewRadius.x));
		Angle += (360.0 / Segments);
	}
}

function SetupPlanet(){
	//Setup Orbit Time
	if(SetOrbit == 0){
		OrbitalTime = ((((EarthDays * OrbitalPeriod) * 24) * 60) * 60);
		OrbitalDegSec = (360 / OrbitalTime) * TimeMultiplier;
	}else{
		OrbitalPeriod = 0;
		OrbitalTime = ((((((((OrbitYears * EarthDays) + OrbitDays) * 24) + OrbitHours) * 60) + OrbitMinutes) * 60) + OrbitSeconds);
		OrbitalDegSec = (360 / OrbitalTime) * TimeMultiplier;
	}
	
	//Setup Rotation Time
	if(!TidalLock){
		if(SetRotation == 0){
			RotationTime = (((24 * RotationPeriod) * 60) * 60);
			RotationDegSec = (360 / OrbitalTime) * TimeMultiplier;
		}else{
			RotationPeriod = 0;
			RotationTime = ((((((((RotationYears * EarthDays) + RotationDays) * 24) + RotationHours) * 60) + RotationMinutes) * 60) + RotationSeconds);
		}
		RotationDegSec = (360 / RotationTime) * TimeMultiplier;
		RotInOrbit = Mathf.Round(OrbitalTime / RotationTime);
		HoursInDay = ((RotationTime / 60) / 60);
	}
}

function Update(){
	if(!LockOrbit){
		var ODS : float = OrbitalDegSec * Time.deltaTime;
		OrbitStartPos += ODS;
		OrbitCenter.Rotate(0,ODS,0);
	}

// Update Rotation
	if(TidalLock){
		ThisTransform.LookAt(Parent);
		if(KeepTime){
			UpdateCounters(0, ODS);
		}
	}else{
		var RotDegSec : float = RotationDegSec * Time.deltaTime;
		if(KeepTime){
			UpdateCounters(RotDegSec, ODS);
		}
		ThisTransform.Rotate(0,RotDegSec, 0, Space.Self);
	}
}

function UpdateCounters(RotDegSec : float, ODS : float){

//Count Orbits / Years
	if((OrbCounter + ODS) >= 360){
		CounterYear += 1;
		CounterDay = 0;
		OrbCounter = (OrbCounter + ODS) - 360;
	}else{
		OrbCounter += ODS;
	}
	
CurrentOrbitPos = OrbCounter;

//Count Days	
	if((RotCounter + RotDegSec)>= 360){
		CounterDay += 1;
		RotCounter = (RotCounter + RotDegSec) - 360;
	}else{
		RotCounter += RotDegSec;
	}

var CurrentTime = (RotCounter / 360) * RotationTime;

//Count Hours
CounterHour = (CurrentTime / 60) / 60;

//Count Minutes	
	if(CounterHour > 0){
		CounterMinute = (CurrentTime / 60) - (CounterHour * 60);
	}else{
		CounterMinute = (CurrentTime / 60);
	}

//Count Seconds
	if(CounterHour > 0 && CounterMinute > 0){
		CounterSecond = CurrentTime - ((CounterMinute + (CounterHour * 60)) * 60);
	}else if(CounterHour > 0 && CounterMinute == 0){
		CounterSecond = CurrentTime - ((CounterHour * 60) * 60);
	}else if(CounterHour == 0 && CounterMinute > 0){
		CounterSecond = CurrentTime - (CounterMinute * 60);
	}else if(CounterHour == 0 && CounterMinute == 0){
		CounterSecond = CurrentTime;
	}
}

function LateUpdate(){
var CurPos : Vector3 = Parent.position + Vector3(OrbitOffset.x, OrbitOffset.y,OrbitOffset.z);
OrbitCenter.position = CurPos;
	if(_DrawOrbit){
		ThisOrbit.position = CurPos;
	}
}
@CustomEditor (FX_Planet_Orbit)

class FX_Orbit_Editor extends Editor {
enum setupPlanet {Setup_Orbit, Setup_Rotation, Setup_Seasons}
var SetupPlanet : setupPlanet;
var OrbitTexture : boolean;
function OnInspectorGUI () {
EditorGUILayout.Space ();
GUILayout.Label("ForceX Tools: Planet & Orbit Editor");
GUILayout.Label("Version 1.0.1");

EditorGUILayout.Space ();
EditorGUILayout.Space ();

target.TimeMultiplier = EditorGUILayout.IntField ( "Time Multiplier: ", target.TimeMultiplier);
target.Name = EditorGUILayout.TextField ( "Name: ", target.Name);

EditorGUILayout.Space ();
EditorGUILayout.Space ();

EditorGUILayout.Space ();
EditorGUIUtility.LookLikeInspector();
target.Parent = EditorGUILayout.ObjectField ("Parent Mass: ", target.Parent, Transform, true);
EditorGUIUtility.LookLikeControls();

EditorGUILayout.Space ();
target.LockOrbit = EditorGUILayout.Toggle("Lock Orbit:", target.LockOrbit);
target.TidalLock = EditorGUILayout.Toggle("Tidal Lock:", target.TidalLock);

EditorGUILayout.Space ();
EditorGUILayout.Space ();
GUILayout.Label("Orbit Display 	------------------------------", EditorStyles.boldLabel);
target._DrawOrbit = EditorGUILayout.Toggle("Draw Orbit:", target._DrawOrbit);

if(target._DrawOrbit == true){
	target.Segments = EditorGUILayout.IntField ( "Display Segments: ", target.Segments);
	target.DisplaySize = EditorGUILayout.FloatField ( "Display Size: ", target.DisplaySize);
	target.DisplayColor = EditorGUILayout.ColorField ( "Display Color: ", target.DisplayColor);

	EditorGUILayout.Space ();
	target.UseTexture = EditorGUILayout.Toggle("Use Texture:", target.UseTexture);
	if(target.UseTexture == true){
		EditorGUIUtility.LookLikeInspector();
		target.DisplayTexture = EditorGUILayout.ObjectField ("Display Texture: ", target.DisplayTexture, Texture2D, true);
		EditorGUIUtility.LookLikeControls();
		target.DisplayTiling = EditorGUILayout.IntField ( "Texture Tiling: ", target.DisplayTiling);
	}
}
EditorGUILayout.Space ();
EditorGUILayout.Space ();
EditorGUILayout.Space ();
//SetupPlanet = EditorGUILayout.EnumPopup("Planet Options:",SetupPlanet);

GUILayout.Label("Planet Orbit 	------------------------------", EditorStyles.boldLabel);
EditorGUILayout.Space ();

	//if(SetupPlanet == 0){
		target.AxialTilt = EditorGUILayout.Slider("Axial Tilt: ",target.AxialTilt,0,360);
		target.OrbitalDistance = EditorGUILayout.FloatField ( "Orbital Distance: ", target.OrbitalDistance);
		target.OrbitAngle = EditorGUILayout.FloatField ( "Orbit Angle: ", target.OrbitAngle);
		EditorGUILayout.Space ();
		target.OrbitOffset = EditorGUILayout.Vector3Field ( "Orbit Center Offset: ", target.OrbitOffset);
		EditorGUILayout.Space ();
		
		EditorGUILayout.Space ();
		target.OrbitPosOffset = EditorGUILayout.Slider("Start Orbital Offset: ",target.OrbitPosOffset,0,360);
		EditorGUILayout.Space ();
		if(!target.LockOrbit){
			EditorGUILayout.Space ();
			EditorGUILayout.Space ();
			EditorGUILayout.Space ();
			target.SetOrbit = EditorGUILayout.EnumPopup("Set Orbit:",target.SetOrbit);
			EditorGUILayout.Space ();
			if(target.SetOrbit == 0){
				GUILayout.Label("Orbital Period x1 Earth Years");
				target.OrbitalPeriod = EditorGUILayout.FloatField ( "Orbital Period: ", target.OrbitalPeriod);
			}else{
				GUILayout.Label("Orbital Period In Earth Time");
				target.OrbitYears = EditorGUILayout.IntField ( "Orbit Years: ", target.OrbitYears);
				target.OrbitDays = EditorGUILayout.IntField ( "Orbit Days: ", target.OrbitDays);
				target.OrbitHours = EditorGUILayout.IntField ( "Orbit Hours: ", target.OrbitHours);
				target.OrbitMinutes = EditorGUILayout.IntField ( "Orbit Minutes: ", target.OrbitMinutes);
				target.OrbitSeconds = EditorGUILayout.FloatField ( "Orbit Seconds: ", target.OrbitSeconds);
			}
		}
	//}else
	
	//if(SetupPlanet == 1){	
		if(!target.TidalLock){
			EditorGUILayout.Space ();
			EditorGUILayout.Space ();
			EditorGUILayout.Space ();
			GUILayout.Label("Planet Rotation 	------------------------------", EditorStyles.boldLabel);
			EditorGUILayout.Space ();
			target.SetRotation = EditorGUILayout.EnumPopup("Set Rotation:",target.SetRotation);
			EditorGUILayout.Space ();
			if(target.SetRotation == 0){
				GUILayout.Label("Rotation Period x1 Earth Days");
				target.RotationPeriod = EditorGUILayout.FloatField ( "Orbital Period: ", target.OrbitalPeriod);
			}else{
				GUILayout.Label("Rotation Period In Earth Time");
				target.RotationYears = EditorGUILayout.IntField ( "Rotation Years: ", target.RotationYears);
				target.RotationDays = EditorGUILayout.IntField ( "Rotation Days: ", target.RotationDays);
				target.RotationHours = EditorGUILayout.IntField ( "Rotation Hours: ", target.RotationHours);
				target.RotationMinutes = EditorGUILayout.IntField ( "Rotation Minutes: ", target.RotationMinutes);
				target.RotationSeconds = EditorGUILayout.FloatField ( "Rotation Seconds: ", target.RotationSeconds);
			}

	}
	//}

EditorGUILayout.Space ();	
EditorGUILayout.Space ();
EditorGUILayout.Space ();
EditorGUILayout.Space ();
EditorGUILayout.Space ();
EditorGUILayout.Space ();
	if(!target.LockOrbit){
		GUILayout.Label("Local Planetary Statistics 	--------------------",  EditorStyles.boldLabel);
		
		EditorGUILayout.Space ();
		//GUILayout.Label("Allow Start Orbital Offset To Effect Year");
		//target.OrbitOffSetYear = EditorGUILayout.Toggle("Enabled:", target.OrbitOffSetYear);
		target.CurrentOrbitPos = EditorGUILayout.Slider("Orbital Position: ",target.CurrentOrbitPos,0,360);
		
		EditorGUILayout.Space ();
		target.KeepTime = EditorGUILayout.Toggle("Keep Local Time:", target.KeepTime);
		
		if(target.KeepTime == true){
			EditorGUIUtility.LookLikeInspector();
			target.CounterYear = EditorGUILayout.IntField ( "	Orbits: ", target.CounterYear);
			if(!target.TidalLock){
				target.CounterDay = EditorGUILayout.IntField ( "	Rotations: ", target.CounterDay);
			
				EditorGUILayout.Space ();	
				
				target.RotInOrbit = EditorGUILayout.IntField ( "	Rotations Per Orbit: ", target.RotInOrbit);
				target.HoursInDay = EditorGUILayout.IntField ( "	Hours Per Rotation: ", target.HoursInDay);
				
				EditorGUILayout.Space ();	
				GUILayout.Label("Current Local Time");
				target.CounterHour = EditorGUILayout.FloatField ( "	Hours: ", target.CounterHour);
				target.CounterMinute = EditorGUILayout.FloatField ( "	Minutes: ", target.CounterMinute);
				target.CounterSecond = EditorGUILayout.FloatField ( "	Seconds: ", target.CounterSecond);
			}
		}
	}
}
}
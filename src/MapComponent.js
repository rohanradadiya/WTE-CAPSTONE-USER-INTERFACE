import React, { useState, useEffect, useCallback } from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";

const mapContainerStyle = {
    width: "100%",
    height: "400px",
};

const MapComponent = ({ bins, setBins, trucks, setTrucks }) => {
    const [selectedBin, setSelectedBin] = useState(null);

    const handleMarkerClick = useCallback((bin) => {
        setSelectedBin(bin);
    }, []);

    useEffect(() => {
        const truckInterval = setInterval(() => {
            setTrucks(prevTrucks =>
                prevTrucks.map(truck => {
                    const newLocation = {
                        lat: truck.location.lat + (Math.random() * 0.005 - 0.0025),
                        lng: truck.location.lng + (Math.random() * 0.005 - 0.0025),
                    };

                    let collectedBins = new Set(truck.collectedBins);
                    // Prevent duplicates
                    let newWeight = truck.weight;
                    // Initialize new weight

                    setBins(prevBins =>
                        prevBins.map(bin => {
                            if (bin.fillLevel > 0) {
                                const distance = Math.sqrt(
                                    Math.pow(newLocation.lat - bin.lat, 2) + 
                                    Math.pow(newLocation.lng - bin.lng, 2)
                                );

                                if (distance < 0.002) {
                                    // If truck is close enough to bin
                                    const currentTimestamp = new Date().toLocaleString();
                                    console.log(`✅ Truck ${truck.id} collected Bin ${bin.id} at ${currentTimestamp}!`);

                                    collectedBins.add(bin.id);
                                    // Add to set (prevents duplicates)

                                    // Update truck weight based on the collected bin
                                    switch(bin.id) {
                                        case 1: newWeight += 20; break;
                                        case 2: newWeight += 50; break;
                                        case 3: newWeight += 40; break;
                                        default: break;
                                    }

                                    // Trigger an alert for bin collection
                                    alert(`Truck ${truck.id} collected Bin ${bin.id} at ${currentTimestamp}!`);

                                    return { 
                                        ...bin, 
                                        fillLevel: 0,
                                        // Mark bin as collected
                                        lastCollected: currentTimestamp,
                                        collectedBy: truck.id 
                                    };
                                }
                            }
                            return bin;
                        })
                    );

                    const updatedTruck = { 
                        ...truck, 
                        location: newLocation,
                        collectedBins: Array.from(collectedBins).sort(),
                        // Prevent duplicates and sort them
                        weight: newWeight
                        // Ensure weight is updated in the state
                    };

                    console.log(`Truck ${truck.id} new state:`, updatedTruck);
                    // Debugging log

                    return updatedTruck;
                })
            );
        }, 5000);

        return () => clearInterval(truckInterval);
    }, [setBins, setTrucks, bins]);

    useEffect(() => {
        bins.forEach(bin => {
            if (bin.fillLevel >= 80) { 
                // Trigger alert when bin fill level is 80% or more
                alert(`Bin ${bin.id} is ${bin.fillLevel}% full and needs collection soon!`);
            }
        });
    }, [bins]);

    return (
        <LoadScript googleMapsApiKey="PUT GOOGLE API KEY HERE">
            <GoogleMap mapContainerStyle={mapContainerStyle} center={trucks[0].location} zoom={14}>
                {trucks.map(truck => (
                    <Marker key={truck.id} position={truck.location} label={`🚛 ${truck.id}`} />
                ))}

                {bins.map(bin => (
                    <Marker
                        key={bin.id}
                        position={{ lat: bin.lat, lng: bin.lng }}
                        label={bin.fillLevel === 0 ? "✅" : `${bin.fillLevel}%`}
                        icon={{
                            url: bin.fillLevel === 0 ? "http://maps.google.com/mapfiles/ms/icons/green-dot.png" : "http://maps.google.com/mapfiles/ms/icons/red-dot.png"
                        }}
                        onClick={() => handleMarkerClick(bin)}
                    />
                ))}

                {selectedBin && (
                    <InfoWindow
                        position={{ lat: selectedBin.lat, lng: selectedBin.lng }}
                        onCloseClick={() => setSelectedBin(null)}
                    >
                        <div>
                            <h4>Bin ID: {selectedBin.id}</h4>
                            <p>Fill Level: {selectedBin.fillLevel}%</p>
                            <p>Status: {selectedBin.fillLevel === 0 ? "✅ Collected" : "🔴 Needs Collection"}</p>
                            <p>Last Collected: {selectedBin.lastCollected || "Not yet collected"}</p>
                            <p>Collected By: {selectedBin.collectedBy ? `Truck ${selectedBin.collectedBy}` : "Unknown"}</p>
                        </div>
                    </InfoWindow>
                )}
            </GoogleMap>
        </LoadScript>
    );
};

export default MapComponent;

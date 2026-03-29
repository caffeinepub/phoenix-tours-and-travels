import Array "mo:core/Array";
import Map "mo:core/Map";
import Time "mo:core/Time";

import OutCall "http-outcalls/outcall";


actor {
  type TourPackage = {
    name : Text;
    destination : Text;
    price : Nat;
    duration : Nat;
    description : Text;
    image : Text;
  };

  type Destination = {
    name : Text;
    country : Text;
    price : Nat;
    rating : Nat;
  };

  type Service = {
    name : Text;
    description : Text;
  };

  type Inquiry = {
    name : Text;
    email : Text;
    message : Text;
    timestamp : Int;
  };

  var googleSheetsWebhookURL : ?Text = null;

  let tourPackages = Map.empty<Text, TourPackage>();
  let destinations = Map.empty<Text, Destination>();
  let services = Map.empty<Text, Service>();
  let inquiries = Map.empty<Int, Inquiry>();

  // Tour Packages
  public shared ({ caller }) func addTourPackage(id : Text, package : TourPackage) : async () {
    tourPackages.add(id, package);
  };

  public query ({ caller }) func getTourPackage(id : Text) : async ?TourPackage {
    tourPackages.get(id);
  };

  public query ({ caller }) func getAllTourPackages() : async [TourPackage] {
    tourPackages.values().toArray();
  };

  // Destinations
  public shared ({ caller }) func addDestination(id : Text, destination : Destination) : async () {
    destinations.add(id, destination);
  };

  public query ({ caller }) func getDestination(id : Text) : async ?Destination {
    destinations.get(id);
  };

  public query ({ caller }) func getAllDestinations() : async [Destination] {
    destinations.values().toArray();
  };

  // Services
  public shared ({ caller }) func addService(id : Text, service : Service) : async () {
    services.add(id, service);
  };

  public query ({ caller }) func getService(id : Text) : async ?Service {
    services.get(id);
  };

  public query ({ caller }) func getAllServices() : async [Service] {
    services.values().toArray();
  };

  // Google Sheets Webhook
  public shared ({ caller }) func setGoogleSheetsWebhook(url : Text) : async () {
    googleSheetsWebhookURL := ?url;
  };

  public query ({ caller }) func getGoogleSheetsWebhook() : async ?Text {
    googleSheetsWebhookURL;
  };

  // Inquiries
  public query func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };

  public shared ({ caller }) func submitInquiry(name : Text, email : Text, message : Text) : async () {
    let timestamp = Time.now();
    let inquiry : Inquiry = {
      name;
      email;
      message;
      timestamp;
    };
    inquiries.add(timestamp, inquiry);

    // Post to Google Sheets webhook if URL is set
    switch (googleSheetsWebhookURL) {
      case (null) {};
      case (?url) {
        // Build JSON payload
        let json = (
          "{ \"name\": " # name # ", \"email\": " # email # ", \"message\": " # message # ", \"timestamp\": " # timestamp.toText() # " }"
        );
        // Ignore response since we're just forwarding data
        ignore OutCall.httpPostRequest(url, [], json, transform);
      };
    };
  };

  public query ({ caller }) func getInquiries() : async [Inquiry] {
    inquiries.values().toArray();
  };
};

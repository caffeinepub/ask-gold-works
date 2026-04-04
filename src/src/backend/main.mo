import Map "mo:core/Map";
import Array "mo:core/Array";
import Time "mo:core/Time";
import Iter "mo:core/Iter";
import Text "mo:core/Text";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";
import MixinStorage "blob-storage/Mixin";
import Storage "blob-storage/Storage";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);
  include MixinStorage();

  // Product Management
  type Product = {
    id : Text;
    name : Text;
    description : Text;
    imageId : ?Storage.ExternalBlob;
    price : ?Text;
    createdAt : Time.Time;
  };

  module Product {
    public func compare(product1 : Product, product2 : Product) : Order.Order {
      Text.compare(product1.id, product2.id);
    };
  };

  let products = Map.empty<Text, Product>();

  // Booking Management
  type Booking = {
    #pending : {
      id : Text;
      name : Text;
      email : Text;
      phone : Text;
      preferredDate : Text;
      preferredTime : Text;
      service : Text;
      notes : Text;
      createdAt : Time.Time;
    };
  };

  module Booking {
    public func compare(booking1 : Booking, booking2 : Booking) : Order.Order {
      switch (booking1, booking2) {
        case (#pending(b1), #pending(b2)) { Text.compare(b1.id, b2.id) };
      };
    };
  };

  let bookings = Map.empty<Text, Booking>();

  // Contact Management
  type Contact = {
    #unread : {
      id : Text;
      name : Text;
      email : Text;
      phone : Text;
      message : Text;
      createdAt : Time.Time;
    };
    #read : {
      id : Text;
      name : Text;
      email : Text;
      phone : Text;
      message : Text;
      createdAt : Time.Time;
    };
  };

  module Contact {
    public func compare(contact1 : Contact, contact2 : Contact) : Order.Order {
      switch (contact1, contact2) {
        case (#unread(c1), #unread(c2)) { Text.compare(c1.id, c2.id) };
        case (#unread(c1), #read(c2)) { Text.compare(c1.id, c2.id) };
        case (#read(c1), #unread(c2)) { Text.compare(c1.id, c2.id) };
        case (#read(c1), #read(c2)) { Text.compare(c1.id, c2.id) };
      };
    };
  };

  let contacts = Map.empty<Text, Contact>();

  // Product Methods
  public query ({ caller }) func listProducts() : async [Product] {
    products.values().toArray().sort();
  };

  public query ({ caller }) func getProduct(id : Text) : async Product {
    switch (products.get(id)) {
      case (null) { Runtime.trap("Product not found") };
      case (?product) { product };
    };
  };

  public shared ({ caller }) func addProduct(name : Text, description : Text, imageId : ?Storage.ExternalBlob, price : ?Text) : async Text {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };

    let id = name.concat(Time.now().toText());
    let product : Product = {
      id;
      name;
      description;
      imageId;
      price;
      createdAt = Time.now();
    };
    products.add(id, product);
    id;
  };

  public shared ({ caller }) func updateProduct(id : Text, name : Text, description : Text, imageId : ?Storage.ExternalBlob, price : ?Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    let product : Product = {
      id;
      name;
      description;
      imageId;
      price;
      createdAt = Time.now();
    };
    products.add(id, product);
  };

  public shared ({ caller }) func deleteProduct(id : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    products.remove(id);
  };

  // Booking Methods
  public shared ({ caller }) func submitBooking(name : Text, email : Text, phone : Text, preferredDate : Text, preferredTime : Text, service : Text, notes : Text) : async Bool {
    let id = name.concat(Time.now().toText());
    let booking = #pending({
      id;
      name;
      email;
      phone;
      preferredDate;
      preferredTime;
      service;
      notes;
      createdAt = Time.now();
    });
    bookings.add(id, booking);
    true;
  };

  public query ({ caller }) func listBookings() : async [Booking] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    bookings.values().toArray().sort();
  };

  public shared ({ caller }) func deleteBooking(id : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    if (not bookings.containsKey(id)) {
      Runtime.trap("Booking not found");
    };
    bookings.remove(id);
  };

  // Contact Methods
  public shared ({ caller }) func submitContact(name : Text, email : Text, phone : Text, message : Text) : async Bool {
    let id = name.concat(Time.now().toText());
    let contact = #unread({
      id;
      name;
      email;
      phone;
      message;
      createdAt = Time.now();
    });
    contacts.add(id, contact);
    true;
  };

  public query ({ caller }) func listContacts() : async [Contact] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    contacts.values().toArray().sort();
  };

  public shared ({ caller }) func deleteContact(id : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    contacts.remove(id);
  };

  public shared ({ caller }) func markContactAsRead(id : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    switch (contacts.get(id)) {
      case (null) { Runtime.trap("Contact not found") };
      case (?contact) {
        switch (contact) {
          case (#unread(data)) {
            contacts.add(id, #read(data));
          };
          case (#read(_)) { Runtime.trap("Contact already marked as read") };
        };
      };
    };
  };
};

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Users, Home, MessageSquare, Plus, Edit, Trash2, LogOut, CheckCircle, XCircle, Clock, Phone, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";

interface ContactMessage {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
}

interface Property {
  id: number;
  title: string;
  location: string;
  price: string;
  beds: number;
  baths: number;
  sqft: string;
  type: 'buy' | 'rent';
  image: string;
  phone: string;
  status: 'active' | 'inactive';
}

interface PendingProperty {
  id: number;
  title: string;
  location: string;
  price: string;
  description: string;
  propertyType: string;
  bedrooms: number;
  bathrooms: number;
  sqft: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  submissionDate: string;
  status: 'pending' | 'approved' | 'rejected';
}

const Admin = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('listings');
  
  const [contacts, setContacts] = useState<ContactMessage[]>([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      subject: "Property Inquiry",
      message: "I'm interested in the downtown apartment listing.",
      date: "2024-01-15"
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      subject: "Selling Property",
      message: "I want to list my house for sale.",
      date: "2024-01-14"
    }
  ]);

  // All current listings (buy, sell, rent)
  const [properties, setProperties] = useState<Property[]>([
    {
      id: 1,
      title: "Beautiful Family Home",
      location: "123 Oak Street, Downtown",
      price: "$450,000",
      beds: 4,
      baths: 3,
      sqft: "2,400 sq ft",
      type: 'buy',
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      phone: "(555) 123-4567",
      status: 'active'
    },
    {
      id: 2,
      title: "Modern Luxury Condo",
      location: "456 Pine Avenue, Uptown",
      price: "$680,000",
      beds: 2,
      baths: 2,
      sqft: "1,800 sq ft",
      type: 'buy',
      image: "https://images.unsplash.com/photo-1524230572899-a752b3835840",
      phone: "(555) 234-5678",
      status: 'active'
    },
    {
      id: 3,
      title: "Downtown Luxury Apartment",
      location: "789 Main Street, City Center",
      price: "$2,500/month",
      beds: 2,
      baths: 2,
      sqft: "1,200 sq ft",
      type: 'rent',
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
      phone: "(555) 345-6789",
      status: 'active'
    },
    {
      id: 4,
      title: "Cozy Studio Apartment",
      location: "321 Elm Street, Midtown",
      price: "$1,800/month",
      beds: 1,
      baths: 1,
      sqft: "800 sq ft",
      type: 'rent',
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
      phone: "(555) 456-7890",
      status: 'active'
    }
  ]);

  const [pendingProperties, setPendingProperties] = useState<PendingProperty[]>([
    {
      id: 1,
      title: "Beautiful Family Home",
      location: "123 Main Street, Springfield",
      price: "450000",
      description: "This stunning family home features modern amenities and a great location.",
      propertyType: "house",
      bedrooms: 3,
      bathrooms: 2,
      sqft: "2400",
      contactName: "Alice Johnson",
      contactEmail: "alice@example.com",
      contactPhone: "(555) 123-4567",
      submissionDate: "2024-01-16",
      status: 'pending'
    },
    {
      id: 2,
      title: "Cozy Downtown Apartment",
      location: "456 Oak Avenue, Downtown",
      price: "1800",
      description: "Perfect apartment for young professionals in the heart of the city.",
      propertyType: "apartment",
      bedrooms: 1,
      bathrooms: 1,
      sqft: "800",
      contactName: "Bob Wilson",
      contactEmail: "bob@example.com",
      contactPhone: "(555) 987-6543",
      submissionDate: "2024-01-15",
      status: 'pending'
    }
  ]);

  const [newProperty, setNewProperty] = useState({
    title: "",
    location: "",
    price: "",
    beds: 1,
    baths: 1,
    sqft: "",
    type: 'buy' as 'buy' | 'rent',
    image: "",
    phone: "",
    status: 'active' as 'active' | 'inactive'
  });

  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [editingPendingProperty, setEditingPendingProperty] = useState<PendingProperty | null>(null);
  const [showPropertyDialog, setShowPropertyDialog] = useState(false);
  const [showPendingPropertyDialog, setShowPendingPropertyDialog] = useState(false);
  const [showContactDialog, setShowContactDialog] = useState(false);
  const [showViewPropertyDialog, setShowViewPropertyDialog] = useState(false);
  const [showViewPendingDialog, setShowViewPendingDialog] = useState(false);
  const [viewingContact, setViewingContact] = useState<ContactMessage | null>(null);
  const [viewingProperty, setViewingProperty] = useState<Property | null>(null);
  const [viewingPendingProperty, setViewingPendingProperty] = useState<PendingProperty | null>(null);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('adminLoggedIn');
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully.",
    });
    navigate('/');
  };

  const handleDeleteContact = (id: number) => {
    setContacts(contacts.filter(contact => contact.id !== id));
    toast({
      title: "Contact Deleted",
      description: "Contact message has been removed.",
    });
  };

  const handleAddProperty = () => {
    if (editingProperty) {
      setProperties(properties.map(p => p.id === editingProperty.id ? { ...newProperty, id: editingProperty.id } : p));
      toast({ title: "Property Updated", description: "Property has been updated successfully." });
    } else {
      const newId = Math.max(...properties.map(p => p.id)) + 1;
      setProperties([...properties, { ...newProperty, id: newId }]);
      toast({ title: "Property Added", description: "New property has been added successfully." });
    }
    
    setNewProperty({ title: "", location: "", price: "", beds: 1, baths: 1, sqft: "", type: 'buy', image: "", phone: "", status: 'active' });
    setEditingProperty(null);
    setShowPropertyDialog(false);
  };

  const handleEditProperty = (property: Property) => {
    setNewProperty(property);
    setEditingProperty(property);
    setShowPropertyDialog(true);
  };

  const handleDeleteProperty = (id: number) => {
    setProperties(properties.filter(property => property.id !== id));
    toast({
      title: "Property Deleted",
      description: "Property has been removed.",
    });
  };

  const handleTogglePropertyStatus = (id: number) => {
    setProperties(properties.map(p => 
      p.id === id ? { ...p, status: p.status === 'active' ? 'inactive' : 'active' } : p
    ));
    toast({
      title: "Status Updated",
      description: "Property status has been changed.",
    });
  };

  const handleApprovePendingProperty = (pendingProperty: PendingProperty) => {
    // Convert pending property to approved property
    const newProperty: Property = {
      id: Math.max(...properties.map(p => p.id), 0) + 1,
      title: pendingProperty.title,
      location: pendingProperty.location,
      price: pendingProperty.propertyType === 'apartment' ? `$${pendingProperty.price}/month` : `$${pendingProperty.price}`,
      beds: pendingProperty.bedrooms,
      baths: pendingProperty.bathrooms,
      sqft: `${pendingProperty.sqft} sq ft`,
      type: pendingProperty.propertyType === 'apartment' ? 'rent' : 'buy',
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
      phone: pendingProperty.contactPhone,
      status: 'active'
    };

    setProperties([...properties, newProperty]);
    setPendingProperties(pendingProperties.filter(p => p.id !== pendingProperty.id));
    
    toast({
      title: "Property Approved",
      description: "Property has been approved and added to listings.",
    });
  };

  const handleRejectPendingProperty = (id: number) => {
    setPendingProperties(pendingProperties.filter(p => p.id !== id));
    toast({
      title: "Property Rejected",
      description: "Property submission has been rejected.",
    });
  };

  const handleEditPendingProperty = (property: PendingProperty) => {
    setEditingPendingProperty(property);
    setShowPendingPropertyDialog(true);
  };

  const handleUpdatePendingProperty = () => {
    if (editingPendingProperty) {
      setPendingProperties(pendingProperties.map(p => 
        p.id === editingPendingProperty.id ? editingPendingProperty : p
      ));
      toast({
        title: "Property Updated",
        description: "Pending property has been updated.",
      });
    }
    setEditingPendingProperty(null);
    setShowPendingPropertyDialog(false);
  };

  const handleCallProperty = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  const handleViewContact = (contact: ContactMessage) => {
    setViewingContact(contact);
    setShowContactDialog(true);
  };

  const handleViewProperty = (property: Property) => {
    setViewingProperty(property);
    setShowViewPropertyDialog(true);
  };

  const handleViewPendingProperty = (property: PendingProperty) => {
    setViewingPendingProperty(property);
    setShowViewPendingDialog(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Admin Dashboard</h1>
            <p className="text-gray-600">Manage your real estate platform</p>
          </div>
          <Button onClick={handleLogout} variant="outline" className="text-red-600 border-red-600 hover:bg-red-600 hover:text-white">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Button
            variant={activeTab === 'listings' ? 'default' : 'outline'}
            onClick={() => setActiveTab('listings')}
            className="flex items-center text-xs sm:text-sm"
          >
            <Home className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">All Listings</span>
            <span className="sm:hidden">Listings</span>
          </Button>
          <Button
            variant={activeTab === 'pending' ? 'default' : 'outline'}
            onClick={() => setActiveTab('pending')}
            className="flex items-center text-xs sm:text-sm"
          >
            <Clock className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Pending Properties</span>
            <span className="sm:hidden">Pending</span>
          </Button>
          <Button
            variant={activeTab === 'contacts' ? 'default' : 'outline'}
            onClick={() => setActiveTab('contacts')}
            className="flex items-center text-xs sm:text-sm"
          >
            <MessageSquare className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Contact Messages</span>
            <span className="sm:hidden">Contacts</span>
          </Button>
        </div>

        {/* All Listings Tab */}
        {activeTab === 'listings' && (
          <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
              <h2 className="text-xl sm:text-2xl font-bold">All Property Listings</h2>
              <Dialog open={showPropertyDialog} onOpenChange={setShowPropertyDialog}>
                <DialogTrigger asChild>
                  <Button onClick={() => { setEditingProperty(null); setNewProperty({ title: "", location: "", price: "", beds: 1, baths: 1, sqft: "", type: 'buy', image: "", phone: "", status: 'active' }); }}>
                    <Plus className="mr-2 h-4 w-4" />
                    <span className="hidden sm:inline">Add Property</span>
                    <span className="sm:hidden">Add</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-[95vw] max-w-md max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>{editingProperty ? 'Edit Property' : 'Add New Property'}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        value={newProperty.title}
                        onChange={(e) => setNewProperty({ ...newProperty, title: e.target.value })}
                        placeholder="Property title"
                      />
                    </div>
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={newProperty.location}
                        onChange={(e) => setNewProperty({ ...newProperty, location: e.target.value })}
                        placeholder="Property location"
                      />
                    </div>
                    <div>
                      <Label htmlFor="price">Price</Label>
                      <Input
                        id="price"
                        value={newProperty.price}
                        onChange={(e) => setNewProperty({ ...newProperty, price: e.target.value })}
                        placeholder="$450,000 or $2,500/month"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="beds">Bedrooms</Label>
                        <Input
                          id="beds"
                          type="number"
                          value={newProperty.beds}
                          onChange={(e) => setNewProperty({ ...newProperty, beds: parseInt(e.target.value) })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="baths">Bathrooms</Label>
                        <Input
                          id="baths"
                          type="number"
                          value={newProperty.baths}
                          onChange={(e) => setNewProperty({ ...newProperty, baths: parseInt(e.target.value) })}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="sqft">Square Feet</Label>
                      <Input
                        id="sqft"
                        value={newProperty.sqft}
                        onChange={(e) => setNewProperty({ ...newProperty, sqft: e.target.value })}
                        placeholder="2,100 sq ft"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Contact Phone</Label>
                      <Input
                        id="phone"
                        value={newProperty.phone}
                        onChange={(e) => setNewProperty({ ...newProperty, phone: e.target.value })}
                        placeholder="(555) 123-4567"
                      />
                    </div>
                    <div>
                      <Label htmlFor="type">Type</Label>
                      <Select value={newProperty.type} onValueChange={(value: 'buy' | 'rent') => setNewProperty({ ...newProperty, type: value })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="buy">Buy</SelectItem>
                          <SelectItem value="rent">Rent</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="status">Status</Label>
                      <Select value={newProperty.status} onValueChange={(value: 'active' | 'inactive') => setNewProperty({ ...newProperty, status: value })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="image">Image URL</Label>
                      <Input
                        id="image"
                        value={newProperty.image}
                        onChange={(e) => setNewProperty({ ...newProperty, image: e.target.value })}
                        placeholder="https://images.unsplash.com/..."
                      />
                    </div>
                    <Button onClick={handleAddProperty} className="w-full">
                      {editingProperty ? 'Update Property' : 'Add Property'}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <Card>
              <CardContent className="p-0 overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="hidden sm:table-cell">Image</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead className="hidden md:table-cell">Location</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead className="hidden sm:table-cell">Beds/Baths</TableHead>
                      <TableHead className="hidden lg:table-cell">Type</TableHead>
                      <TableHead className="hidden lg:table-cell">Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {properties.map((property) => (
                      <TableRow key={property.id}>
                        <TableCell className="hidden sm:table-cell">
                          <img src={property.image} alt={property.title} className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded" />
                        </TableCell>
                        <TableCell className="font-medium">{property.title}</TableCell>
                        <TableCell className="hidden md:table-cell">{property.location}</TableCell>
                        <TableCell className="font-semibold text-brand-green">{property.price}</TableCell>
                        <TableCell className="hidden sm:table-cell">{property.beds}bed / {property.baths}bath</TableCell>
                        <TableCell className="hidden lg:table-cell">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            property.type === 'buy' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                          }`}>
                            {property.type === 'buy' ? 'For Sale' : 'For Rent'}
                          </span>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            property.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {property.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col sm:flex-row gap-1 sm:gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleViewProperty(property)}
                              className="text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white"
                            >
                              <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleCallProperty(property.phone)}
                              className="text-orange-600 border-orange-600 hover:bg-orange-600 hover:text-white"
                            >
                              <Phone className="h-3 w-3 sm:h-4 sm:w-4" />
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleEditProperty(property)}>
                              <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleTogglePropertyStatus(property.id)}
                              className={property.status === 'active' ? 'text-gray-600' : 'text-green-600'}
                            >
                              {property.status === 'active' ? 'Deactivate' : 'Activate'}
                            </Button>
                            <Button variant="destructive" size="sm" onClick={() => handleDeleteProperty(property.id)}>
                              <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Pending Properties Tab */}
        {activeTab === 'pending' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl sm:text-2xl font-bold">Pending Property Submissions</h2>
            </div>

            <Card>
              <CardContent className="p-0 overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead className="hidden md:table-cell">Location</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead className="hidden sm:table-cell">Contact</TableHead>
                      <TableHead className="hidden lg:table-cell">Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingProperties.map((property) => (
                      <TableRow key={property.id}>
                        <TableCell className="font-medium">{property.title}</TableCell>
                        <TableCell className="hidden md:table-cell">{property.location}</TableCell>
                        <TableCell className="font-semibold text-brand-green">
                          ${property.price}{property.propertyType === 'apartment' ? '/month' : ''}
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">{property.contactName}</TableCell>
                        <TableCell className="hidden lg:table-cell">{property.submissionDate}</TableCell>
                        <TableCell>
                          <div className="flex flex-col sm:flex-row gap-1 sm:gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleViewPendingProperty(property)}
                              className="text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white"
                            >
                              <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleApprovePendingProperty(property)}
                              className="text-green-600 border-green-600 hover:bg-green-600 hover:text-white"
                            >
                              <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEditPendingProperty(property)}
                            >
                              <Edit className="h-3 w-3 sm:h-4 sm:w-4" />
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleRejectPendingProperty(property.id)}
                            >
                              <XCircle className="h-3 w-3 sm:h-4 sm:w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Edit Pending Property Dialog */}
            <Dialog open={showPendingPropertyDialog} onOpenChange={setShowPendingPropertyDialog}>
              <DialogContent className="w-[95vw] max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Edit Pending Property</DialogTitle>
                </DialogHeader>
                {editingPendingProperty && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="edit-title">Title</Label>
                        <Input
                          id="edit-title"
                          value={editingPendingProperty.title}
                          onChange={(e) => setEditingPendingProperty({ ...editingPendingProperty, title: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="edit-location">Location</Label>
                        <Input
                          id="edit-location"
                          value={editingPendingProperty.location}
                          onChange={(e) => setEditingPendingProperty({ ...editingPendingProperty, location: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="edit-price">Price</Label>
                        <Input
                          id="edit-price"
                          value={editingPendingProperty.price}
                          onChange={(e) => setEditingPendingProperty({ ...editingPendingProperty, price: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="edit-type">Property Type</Label>
                        <Select 
                          value={editingPendingProperty.propertyType} 
                          onValueChange={(value) => setEditingPendingProperty({ ...editingPendingProperty, propertyType: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="house">House</SelectItem>
                            <SelectItem value="apartment">Apartment</SelectItem>
                            <SelectItem value="condo">Condo</SelectItem>
                            <SelectItem value="townhouse">Townhouse</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="edit-bedrooms">Bedrooms</Label>
                        <Input
                          id="edit-bedrooms"
                          type="number"
                          value={editingPendingProperty.bedrooms}
                          onChange={(e) => setEditingPendingProperty({ ...editingPendingProperty, bedrooms: parseInt(e.target.value) })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="edit-bathrooms">Bathrooms</Label>
                        <Input
                          id="edit-bathrooms"
                          type="number"
                          step="0.5"
                          value={editingPendingProperty.bathrooms}
                          onChange={(e) => setEditingPendingProperty({ ...editingPendingProperty, bathrooms: parseFloat(e.target.value) })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="edit-sqft">Square Feet</Label>
                        <Input
                          id="edit-sqft"
                          value={editingPendingProperty.sqft}
                          onChange={(e) => setEditingPendingProperty({ ...editingPendingProperty, sqft: e.target.value })}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="edit-description">Description</Label>
                      <Textarea
                        id="edit-description"
                        value={editingPendingProperty.description}
                        onChange={(e) => setEditingPendingProperty({ ...editingPendingProperty, description: e.target.value })}
                        rows={3}
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="edit-contact-name">Contact Name</Label>
                        <Input
                          id="edit-contact-name"
                          value={editingPendingProperty.contactName}
                          onChange={(e) => setEditingPendingProperty({ ...editingPendingProperty, contactName: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="edit-contact-email">Contact Email</Label>
                        <Input
                          id="edit-contact-email"
                          type="email"
                          value={editingPendingProperty.contactEmail}
                          onChange={(e) => setEditingPendingProperty({ ...editingPendingProperty, contactEmail: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor="edit-contact-phone">Contact Phone</Label>
                        <Input
                          id="edit-contact-phone"
                          value={editingPendingProperty.contactPhone}
                          onChange={(e) => setEditingPendingProperty({ ...editingPendingProperty, contactPhone: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2 pt-4">
                      <Button onClick={handleUpdatePendingProperty} className="flex-1">
                        Update Property
                      </Button>
                      <Button
                        onClick={() => handleApprovePendingProperty(editingPendingProperty)}
                        className="flex-1 bg-green-600 hover:bg-green-700"
                      >
                        Update & Approve
                      </Button>
                    </div>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          </div>
        )}

        {/* Contact Messages Tab */}
        {activeTab === 'contacts' && (
          <Card>
            <CardHeader>
              <CardTitle>Contact Messages</CardTitle>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead className="hidden sm:table-cell">Email</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead className="hidden md:table-cell">Message</TableHead>
                    <TableHead className="hidden sm:table-cell">Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contacts.map((contact) => (
                    <TableRow key={contact.id}>
                      <TableCell className="font-medium">{contact.name}</TableCell>
                      <TableCell className="hidden sm:table-cell">{contact.email}</TableCell>
                      <TableCell>{contact.subject}</TableCell>
                      <TableCell className="hidden md:table-cell max-w-xs truncate">{contact.message}</TableCell>
                      <TableCell className="hidden sm:table-cell">{contact.date}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewContact(contact)}
                            className="text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDeleteContact(contact.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {/* View Contact Dialog */}
        <Dialog open={showContactDialog} onOpenChange={setShowContactDialog}>
          <DialogContent className="w-[95vw] max-w-2xl">
            <DialogHeader>
              <DialogTitle>Contact Message Details</DialogTitle>
            </DialogHeader>
            {viewingContact && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="font-semibold">Name</Label>
                    <p className="text-gray-700">{viewingContact.name}</p>
                  </div>
                  <div>
                    <Label className="font-semibold">Date</Label>
                    <p className="text-gray-700">{viewingContact.date}</p>
                  </div>
                </div>
                <div>
                  <Label className="font-semibold">Email</Label>
                  <p className="text-gray-700">{viewingContact.email}</p>
                </div>
                <div>
                  <Label className="font-semibold">Subject</Label>
                  <p className="text-gray-700">{viewingContact.subject}</p>
                </div>
                <div>
                  <Label className="font-semibold">Message</Label>
                  <div className="mt-2 p-4 bg-gray-50 rounded-lg border">
                    <p className="text-gray-700 whitespace-pre-wrap">{viewingContact.message}</p>
                  </div>
                </div>
                <div className="flex gap-2 pt-4">
                  <Button
                    onClick={() => window.location.href = `mailto:${viewingContact.email}?subject=Re: ${viewingContact.subject}`}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Reply via Email
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      handleDeleteContact(viewingContact.id);
                      setShowContactDialog(false);
                    }}
                  >
                    Delete Message
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* View Property Dialog */}
        <Dialog open={showViewPropertyDialog} onOpenChange={setShowViewPropertyDialog}>
          <DialogContent className="w-[95vw] max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Property Details</DialogTitle>
            </DialogHeader>
            {viewingProperty && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <img 
                      src={viewingProperty.image} 
                      alt={viewingProperty.title} 
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label className="font-semibold">Title</Label>
                      <p className="text-gray-700 text-lg">{viewingProperty.title}</p>
                    </div>
                    <div>
                      <Label className="font-semibold">Location</Label>
                      <p className="text-gray-700">{viewingProperty.location}</p>
                    </div>
                    <div>
                      <Label className="font-semibold">Price</Label>
                      <p className="text-green-600 text-xl font-bold">{viewingProperty.price}</p>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label className="font-semibold">Bedrooms</Label>
                        <p className="text-gray-700">{viewingProperty.beds}</p>
                      </div>
                      <div>
                        <Label className="font-semibold">Bathrooms</Label>
                        <p className="text-gray-700">{viewingProperty.baths}</p>
                      </div>
                      <div>
                        <Label className="font-semibold">Square Feet</Label>
                        <p className="text-gray-700">{viewingProperty.sqft}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <Label className="font-semibold">Type</Label>
                    <p className="text-gray-700 capitalize">
                      {viewingProperty.type === 'buy' ? 'For Sale' : 'For Rent'}
                    </p>
                  </div>
                  <div>
                    <Label className="font-semibold">Status</Label>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      viewingProperty.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {viewingProperty.status}
                    </span>
                  </div>
                  <div>
                    <Label className="font-semibold">Contact Phone</Label>
                    <p className="text-gray-700">{viewingProperty.phone}</p>
                  </div>
                </div>
                <div className="flex gap-2 pt-4">
                  <Button
                    onClick={() => handleCallProperty(viewingProperty.phone)}
                    className="bg-orange-500 hover:bg-orange-600"
                  >
                    <Phone className="mr-2 h-4 w-4" />
                    Call Now
                  </Button>
                  <Button
                    onClick={() => {
                      handleEditProperty(viewingProperty);
                      setShowViewPropertyDialog(false);
                    }}
                    variant="outline"
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Property
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* View Pending Property Dialog */}
        <Dialog open={showViewPendingDialog} onOpenChange={setShowViewPendingDialog}>
          <DialogContent className="w-[95vw] max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Pending Property Details</DialogTitle>
            </DialogHeader>
            {viewingPendingProperty && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="font-semibold">Title</Label>
                    <p className="text-gray-700 text-lg">{viewingPendingProperty.title}</p>
                  </div>
                  <div>
                    <Label className="font-semibold">Submission Date</Label>
                    <p className="text-gray-700">{viewingPendingProperty.submissionDate}</p>
                  </div>
                </div>
                <div>
                  <Label className="font-semibold">Location</Label>
                  <p className="text-gray-700">{viewingPendingProperty.location}</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="font-semibold">Price</Label>
                    <p className="text-green-600 text-xl font-bold">
                      ${viewingPendingProperty.price}
                      {viewingPendingProperty.propertyType === 'apartment' ? '/month' : ''}
                    </p>
                  </div>
                  <div>
                    <Label className="font-semibold">Property Type</Label>
                    <p className="text-gray-700 capitalize">{viewingPendingProperty.propertyType}</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label className="font-semibold">Bedrooms</Label>
                    <p className="text-gray-700">{viewingPendingProperty.bedrooms}</p>
                  </div>
                  <div>
                    <Label className="font-semibold">Bathrooms</Label>
                    <p className="text-gray-700">{viewingPendingProperty.bathrooms}</p>
                  </div>
                  <div>
                    <Label className="font-semibold">Square Feet</Label>
                    <p className="text-gray-700">{viewingPendingProperty.sqft}</p>
                  </div>
                </div>
                <div>
                  <Label className="font-semibold">Description</Label>
                  <div className="mt-2 p-4 bg-gray-50 rounded-lg border">
                    <p className="text-gray-700 whitespace-pre-wrap">{viewingPendingProperty.description}</p>
                  </div>
                </div>
                <div className="border-t pt-4">
                  <h4 className="font-semibold text-lg mb-3">Contact Information</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <Label className="font-semibold">Name</Label>
                      <p className="text-gray-700">{viewingPendingProperty.contactName}</p>
                    </div>
                    <div>
                      <Label className="font-semibold">Email</Label>
                      <p className="text-gray-700">{viewingPendingProperty.contactEmail}</p>
                    </div>
                    <div>
                      <Label className="font-semibold">Phone</Label>
                      <p className="text-gray-700">{viewingPendingProperty.contactPhone}</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 pt-4">
                  <Button
                    onClick={() => handleApprovePendingProperty(viewingPendingProperty)}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Approve Property
                  </Button>
                  <Button
                    onClick={() => {
                      handleEditPendingProperty(viewingPendingProperty);
                      setShowViewPendingDialog(false);
                    }}
                    variant="outline"
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Property
                  </Button>
                  <Button
                    onClick={() => window.location.href = `mailto:${viewingPendingProperty.contactEmail}`}
                    variant="outline"
                    className="text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white"
                  >
                    Contact Owner
                  </Button>
                  <Button
                    onClick={() => window.location.href = `tel:${viewingPendingProperty.contactPhone}`}
                    className="bg-orange-500 hover:bg-orange-600"
                  >
                    <Phone className="mr-2 h-4 w-4" />
                    Call Owner
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Admin;

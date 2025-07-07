
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Users, Home, MessageSquare, Plus, Edit, Trash2, LogOut } from "lucide-react";
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
}

const Admin = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('contacts');
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

  const [properties, setProperties] = useState<Property[]>([
    {
      id: 1,
      title: "Modern Family Home",
      location: "Downtown, City Center",
      price: "$450,000",
      beds: 3,
      baths: 2,
      sqft: "2,100 sq ft",
      type: 'buy',
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9"
    },
    {
      id: 2,
      title: "Luxury Apartment",
      location: "Uptown District",
      price: "$2,500/month",
      beds: 2,
      baths: 2,
      sqft: "1,800 sq ft",
      type: 'rent',
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2"
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
    image: ""
  });

  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [showPropertyDialog, setShowPropertyDialog] = useState(false);

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
    
    setNewProperty({ title: "", location: "", price: "", beds: 1, baths: 1, sqft: "", type: 'buy', image: "" });
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
            <p className="text-gray-600">Manage your real estate platform</p>
          </div>
          <Button onClick={handleLogout} variant="outline" className="text-red-600 border-red-600 hover:bg-red-600 hover:text-white">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-4 mb-8">
          <Button
            variant={activeTab === 'contacts' ? 'default' : 'outline'}
            onClick={() => setActiveTab('contacts')}
            className="flex items-center"
          >
            <MessageSquare className="mr-2 h-4 w-4" />
            Contact Messages
          </Button>
          <Button
            variant={activeTab === 'properties' ? 'default' : 'outline'}
            onClick={() => setActiveTab('properties')}
            className="flex items-center"
          >
            <Home className="mr-2 h-4 w-4" />
            Properties
          </Button>
        </div>

        {/* Contact Messages Tab */}
        {activeTab === 'contacts' && (
          <Card>
            <CardHeader>
              <CardTitle>Contact Messages</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Message</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contacts.map((contact) => (
                    <TableRow key={contact.id}>
                      <TableCell>{contact.name}</TableCell>
                      <TableCell>{contact.email}</TableCell>
                      <TableCell>{contact.subject}</TableCell>
                      <TableCell className="max-w-xs truncate">{contact.message}</TableCell>
                      <TableCell>{contact.date}</TableCell>
                      <TableCell>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteContact(contact.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {/* Properties Tab */}
        {activeTab === 'properties' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Properties Management</h2>
              <Dialog open={showPropertyDialog} onOpenChange={setShowPropertyDialog}>
                <DialogTrigger asChild>
                  <Button onClick={() => { setEditingProperty(null); setNewProperty({ title: "", location: "", price: "", beds: 1, baths: 1, sqft: "", type: 'buy', image: "" }); }}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Property
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
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
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Image</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Beds/Baths</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {properties.map((property) => (
                      <TableRow key={property.id}>
                        <TableCell>
                          <img src={property.image} alt={property.title} className="w-16 h-16 object-cover rounded" />
                        </TableCell>
                        <TableCell className="font-medium">{property.title}</TableCell>
                        <TableCell>{property.location}</TableCell>
                        <TableCell className="font-semibold text-brand-green">{property.price}</TableCell>
                        <TableCell>{property.beds}bed / {property.baths}bath</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            property.type === 'buy' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                          }`}>
                            {property.type === 'buy' ? 'For Sale' : 'For Rent'}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm" onClick={() => handleEditProperty(property)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="destructive" size="sm" onClick={() => handleDeleteProperty(property.id)}>
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
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;

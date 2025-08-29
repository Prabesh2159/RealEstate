import { useEffect, useState } from "react";
import {
  fetchServiceRequests,
  deleteServiceRequest,
  ServiceRequestItem,
} from "@/back/serviceform";

const ServiceRequestList = () => {
  const [requests, setRequests] = useState<ServiceRequestItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchServiceRequests()
      .then((data) => {
        setRequests(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch service requests");
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteServiceRequest(id);
      setRequests((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      alert("Failed to delete service request.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Service Requests</h2>
      {requests.length === 0 ? (
        <p>No service requests found.</p>
      ) : (
        <ul className="space-y-6">
          {requests.map((item) => (
            <li key={item.id} className="p-4 border rounded shadow bg-white">
              <h3 className="text-xl font-semibold mb-1">{item.service_name}</h3>
              <p><strong>Phone:</strong> {item.phone_no}</p>
              <p><strong>Email:</strong> {item.email}</p>
              <p><strong>Address:</strong> {item.address}</p>
              <p><strong>Type:</strong> {item.service_type}</p>
              <p><strong>Urgency:</strong> {item.Service_urgency}</p>
              <p><strong>Preferred Date:</strong> {item.preffered_date}</p>
              <p className="mt-2">{item.description}</p>

              {item.imag && (
                <img
                  src={`http://localhost:8000${item.imag}`}
                  alt="Service Image"
                  className="mt-3 max-w-xs h-auto rounded"
                />
              )}

              <button
                onClick={() => handleDelete(item.id)}
                className="mt-3 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ServiceRequestList;

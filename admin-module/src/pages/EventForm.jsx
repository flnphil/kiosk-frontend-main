import { DashboardLayout } from "../components/DashboardLayout";
import { Button } from "../components/ui/button";
import { Loader2, Filter } from "lucide-react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { EventBasicInfo } from "../components/event-form/EventBasicInfo";
import { EventDateTimeInputs } from "../components/event-form/EventDateTimeInputs";
import { EventPriceToggle } from "../components/event-form/EventPriceToggle";
import { EventImageUpload } from "../components/event-form/EventImageUpload";
import { useEvents } from "../context/eventscontext";
import { EventSuccessDialog } from "../components/events/EventSuccessDialog";
import { toast } from "react-toastify";

export function EventForm() {
  const { id } = useParams();
  const isEditMode = !!id;
  const navigate = useNavigate();
  const { events, updateEvent, addEvent } = useEvents();
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState(""); // To store selected category id

  const existingEvent = isEditMode ? events.find((e) => e.id === id) : null;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: new Date(),
    time: "09:00",
    endTime: "",
    location: "",
    isFree: true,
    price: 0,
    image: null,
    imageUrl: "",
    capacity: "",
  });

  useEffect(() => {
    // Fetch categories from backend
    fetch("http://localhost:5000/api/categories")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setCategories(data.results);
      })
      .catch((err) => {
        // Optionally handle error
        toast.error("Failed to fetch categories");
      });
  }, []);

  useEffect(() => {
    if (existingEvent) {
      const timeParts = existingEvent.time?.split(" - ") || ["09:00", ""];

      setFormData({
        title: existingEvent.title || "",
        description: existingEvent.description || "",
        date: existingEvent.date ? new Date(existingEvent.date) : new Date(),
        time: timeParts[0].trim() || "09:00",
        endTime: timeParts[1]?.trim() || "",
        location: existingEvent.location || "",
        isFree: existingEvent.isFree ?? true,
        price: existingEvent.price || 0,
        image: null,
        imageUrl: existingEvent.imageUrl || "",
        capacity: existingEvent.maxAttendees
          ? existingEvent.maxAttendees.toString()
          : "",
      });
    }
  }, [existingEvent]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (checked) => {
    setFormData((prev) => ({ ...prev, isFree: checked }));
  };

  const handleDateChange = (date) => {
    setFormData((prev) => ({ ...prev, date }));
  };

  const handleImageChange = (file) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData((prev) => ({
          ...prev,
          image: file,
          imageUrl: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    } else {
      setFormData((prev) => ({ ...prev, image: null, imageUrl: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!categoryId) {
      toast.error("Please select a category");
      setIsSubmitting(false);
      return;
    }

    const formattedDate = formData.date.toISOString().split("T")[0];
    const formattedTime = formData.endTime
      ? `${formData.time} - ${formData.endTime}`
      : formData.time;

    const eventData = {
      title: formData.title,
      description: formData.description,
      location: formData.location,
      date: formattedDate,
      time: formattedTime,
      isFree: formData.isFree,
      price: !formData.isFree ? Number(formData.price) : 0,
      image: formData.image,
      capacity: formData.capacity,
      category_id: categoryId,
    };
    try {
      if (isEditMode && id) {
        await updateEvent(id, eventData);
        toast.success("Event Updated Successfully");
        navigate("/events");
        return;
      } else {
        await addEvent(eventData);
        toast.success("Event Created Successfully");
        setShowSuccessDialog(true);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">
          {isEditMode ? "Edit Event" : "Create New Event"}
        </h1>
        <p className="text-muted-foreground">
          {isEditMode
            ? "Update your event details below"
            : "Fill in the details to create a new event"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <EventBasicInfo
              title={formData.title}
              description={formData.description}
              location={formData.location}
              capacity={formData.capacity}
              onInputChange={handleChange}
            />

            <EventDateTimeInputs
              date={formData.date}
              startTime={formData.time}
              endTime={formData.endTime}
              onDateChange={handleDateChange}
              onInputChange={handleChange}
              categories={categories}
              categoryId={categoryId}
              setCategoryId={setCategoryId}
            />
          </div>

          <div className="space-y-4">
            <EventImageUpload
              existingImageUrl={formData.imageUrl || existingEvent?.imageUrl}
              onImageChange={handleImageChange}
              initialImage={formData.image}
            />

            <EventPriceToggle
              isFree={formData.isFree}
              price={formData.price}
              onSwitchChange={handleSwitchChange}
              onPriceChange={handleChange}
            />
          </div>
        </div>

        <div className="flex justify-end space-x-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/events")}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isEditMode ? "Update Event" : "Create Event"}
          </Button>
        </div>
      </form>

      <EventSuccessDialog
        isOpen={showSuccessDialog}
        setIsOpen={setShowSuccessDialog}
        eventTitle={formData.title}
        isEdit={isEditMode}
      />
    </DashboardLayout>
  );
}

export default EventForm;

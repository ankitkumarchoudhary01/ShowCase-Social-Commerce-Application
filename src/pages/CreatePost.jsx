import React, { useState } from 'react';
import PageWrapper from '../components/PageWrapper';

function CreatePost() {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [caption, setCaption] = useState('');
  const [tags, setTags] = useState('');
  const [place, setPlace] = useState('');
  const [taggedPeople, setTaggedPeople] = useState('');
  const [visibility, setVisibility] = useState('public');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const postData = {
      image,
      caption,
      tags: tags.split(',').map(tag => tag.trim()),
      place,
      taggedPeople: taggedPeople.split(',').map(user => user.trim()),
      visibility,
    };

    console.log('Post Data:', postData);
    alert('Post created successfully!');
  };

  return (
    <PageWrapper>
    <div className='min-h-screen h-auto w-auto bg-pink-200 p-6'>
    <div className="max-w-3xl mx-auto pt-6 p-8 bg-white shadow-lg rounded-xl">
      <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">New Post</h2>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Image Upload + Preview */}
        <div>
          <label className="block font-semibold text-gray-700 mb-2">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 border border-purple-300 rounded-md"
            required
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="mt-4 max-h-full w-full align-center object-contain rounded-md border"
            />
          )}
        </div>

        {/* Caption */}
        <div>
          <label className="block font-semibold text-gray-700 mb-2">Caption</label>
          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Write something awesome..."
            className="w-full p-3 border border-purple-300 rounded-md resize-none"
            rows="3"
            required
          />
        </div>

        {/* Tags */}
        <div>
          <label className="block font-semibold text-gray-700 mb-2">Hashtags (comma-separated)</label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="#summer, #travel"
            className="w-full p-2 border border-purple-300 rounded-md"
          />
        </div>

        {/* Tagged People */}
        <div>
          <label className="block font-semibold text-gray-700 mb-2">Tag People (usernames, comma-separated)</label>
          <input
            type="text"
            value={taggedPeople}
            onChange={(e) => setTaggedPeople(e.target.value)}
            placeholder="@john, @jane"
            className="w-full p-2 border border-purple-300 rounded-md"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block font-semibold text-gray-700 mb-2">Location</label>
          <input
            type="text"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
            placeholder="Eg. Bhopal, India"
            className="w-full p-2 border border-purple-300 rounded-md"
          />
        </div>

        {/* Visibility */}
        <div>
          <label className="block font-semibold text-gray-700 mb-2">Visibility</label>
          <select
            value={visibility}
            onChange={(e) => setVisibility(e.target.value)}
            className="w-full p-2 border border-purple-300 rounded-md"
          >
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        </div>

        {/* Submit */}
        <div className="text-center mt-6">
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-md transition duration-300 shadow-md"
          >
            Post Now
          </button>
        </div>
      </form>
    </div>
    </div>
    </PageWrapper>
  );
}

export default CreatePost;

function BrandCreatePost() {
  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create a Brand Post</h1>
      <form>
        <input type="text" className="w-full border p-3 mb-4 rounded" placeholder="Product Name" />
        <textarea className="w-full border p-3 rounded" placeholder="Describe product or offer..." />
        <input type="file" className="mt-4" />
        <button className="mt-4 px-6 py-2 bg-black text-white rounded">Post</button>
      </form>
    </div>
  );
}
export default BrandCreatePost;

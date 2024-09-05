import React, { useEffect, useState } from 'react';
import '../styles/PersonalFeed.css';

const PersonalFeed = ({ user }) => {
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [filter, setFilter] = useState('All');

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/api/v1/post?userId=${user._id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        const result = await response.json();
        setAllPosts(result.data.reverse());
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchPosts();
    }
  }, [user]);

  const handleDeletePost = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/post/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        setAllPosts((prevPosts) => prevPosts.filter((post) => post._id !== id));
        setSearchedResults((prevResults) => prevResults.filter((post) => post._id !== id));
        setOpenDialog(false);
      } else {
        console.log('Failed to delete post');
      }
    } catch (err) {
      console.log(err);
    }
  };


  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = allPosts.filter(
          (item) =>
            item.name.toLowerCase().includes(searchText.toLowerCase()) ||
            item.prompt.toLowerCase().includes(searchText.toLowerCase())
        );
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedImage(null);
  };

  const filteredPosts = () => {
    let posts = searchText ? searchedResults : allPosts;

    if (filter === 'Favorites') {
      posts = posts.filter((post) => post.isFavorite);
    }

    return posts;
  };

  return (
    <div className="personal-feed-container">
      <h1 className="personal-feed-title">The Community Showcase</h1>

      <div className="personal-feed-filters">
        <input
          type="text"
          placeholder="Search something..."
          value={searchText}
          onChange={handleSearchChange}
          className="personal-feed-search-bar"
        />

        <select value={filter} onChange={handleFilterChange} className="personal-feed-dropdown">
          <option value="All">All</option>
          <option value="Favorites">Favorites</option>
        </select>

        <div className="personal-feed-buttons">
          <button className="personal-feed-filter-btn">Upscaled</button>
          <button className="personal-feed-filter-btn">Motion</button>
        </div>
      </div>

      {loading ? (
        <div className="personal-feed-loading-container">
          <div className="personal-feed-spinner"></div>
        </div>
      ) : (
        <>
          {searchText && (
            <h3 className="personal-feed-search-results">
              Showing Results for <strong>{searchText}</strong>:
            </h3>
          )}
          <div className="personal-feed-grid-container">
            {filteredPosts().length ? (
              filteredPosts().map((post) => (
                <div className="personal-feed-grid-item" key={post._id} onClick={() => handleImageClick(post)}>
                  <img src={post.photo} alt={post.title} className="personal-feed-gallery-image" />
                </div>
              ))
            ) : (
              <p className="personal-feed-no-results">No Posts Found</p>
            )}
          </div>
        </>
      )}

      {openDialog && selectedImage && (
        <div className="personal-feed-dialog-overlay" onClick={handleCloseDialog}>
          <div className="personal-feed-dialog-content" onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage.photo} alt={selectedImage.prompt} className="personal-feed-dialog-image" />
            <h2>{selectedImage.name}</h2>
            <p>{selectedImage.prompt}</p>
            <button className="personal-feed-delete-btn" onClick={() => handleDeletePost(selectedImage._id)}>Delete</button>
            <button className="personal-feed-close-btn" onClick={handleCloseDialog}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonalFeed;

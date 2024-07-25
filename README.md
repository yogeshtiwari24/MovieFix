# MovieFix Project

MovieFix is a movie information app that displays a list of movies from The Movie Database (TMDb) API. The app shows top movies for each year and allows users to filter by genre. It also supports loading top movies from previous and next years as the user scrolls through the list.

## Features

### Layout and UI
- Custom UI components created using React.
- Display a list of movies sorted in descending order of popularity.
- Each movie information card includes:
  - Title
  - Image
  - Genre
  - Cast
  - Director
  - Short description

### Default Page Load State
- Load 20 movies per year by default.
- On initial page load, display movies from the year 2012.
- Implement smooth scrolling to load more movies as the user scrolls:
  - Load movies from the previous year when the user scrolls up.
  - Load movies from the next year when the user scrolls down.
- Ensure smooth and jitter-free interaction during scrolling.

### API
- Use the following URL to query a list of movies:
  `https://api.themoviedb.org/3/discover/movie?api_key=2dca580c2a14b55200e784d157207b4d&sort_by=popularity.desc&primary_release_year=2023&page=1&vote_count.gte=100`
- Fetch movies of a specific year using the `primary_release_year` filter.
- Start from 2012 and adjust the year based on the scrolling direction.
- The `vote_count.gte=100` parameter ensures that only movies with at least 100 votes are fetched.
- Refer to the [API documentation](https://developers.themoviedb.org/3/discover/movie-discover) for more details.

## Installation

1. Clone the repository:
    ```sh
    git clone <repository_url>
    ```
2. Navigate to the project directory:
    ```sh
    cd moviefix
    ```
3. Install dependencies:
    ```sh
    npm install
    ```

## Development

1. Start the development server:
    ```sh
    npm run dev
    ```
2. Open your browser and navigate to `http://localhost:5173` to see the app in action.

## Build

To create a production build of the app:
    ```sh
    npm run build
    ```

## Usage

- Use the filter UI to select genres and update the movie list.
- Scroll up and down to load movies from previous and next years respectively.

## Contributing

Feel free to open issues or submit pull requests if you have suggestions for improvements or new features.

## License

This project is licensed under the MIT License.

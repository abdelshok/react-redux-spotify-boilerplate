// Utility library for Spotify functions

import axios from 'axios';

// TO DO:
// Check every function works correctly with and without all the parameters.
// See if there's any way to do function overloading to avoid having to call function with undefined
// Fix "Important issue"
// Document each function's params, restrictions, and add link to spotify web api
// Maybe add error logging if values are incorrect? 


// General notes:
// 403 errors will be returned if you do not have user's authorization so change the list of permissions
// if you get that error
// 
//
//

// Albums: Done
// Artists: Done
// Browse: DONE
    // GetCategory: Done x redone
    // GetCategoryPlaylists: Done x redone
    // GetListOfCategories: Done
    // GetListOfFeaturedPlaylists: Done
    // GetListOfNewReleases: Done
    // GetRecommendations: Done but incomplete
// EPISODE: Endpoints for retrieving information about one or more episodes from the Spotify catalog
    // GetEpisode: Done
    // GetSeveralEpisodes: Done
// Follow: UNSURE BUT DONE
    // checkIfUserFollows: Done
    // checkIfFollowsPlaylist: Done
    // followArtistsOrUsers: Done
    // followPlaylist: Done
    // getUserFollowedArtist: Done
    // unfollowArtistOrUser: Done
    // unfollowPlaylist: Done
// Library: next
    // checkIfAlbumSaved: Done
    // checkIfShowSaved: Done
    // checkIfTrackSaved: Done
    // getUserSavedAlbums: Done
    // getUserSavedShows: Done
    // getUserSavedTracks: Done
    // removeAlbumsFromUser: done
    // removeShowFromUser (plural?): done
    // removeTracks: done
    // saveAlbums: done
    // saveShows: done
    // saveTracks: done
// PERSONALIZATION: DONE
    // getUserTopTracks: Done
// PLayer
    // getUserDevices
    // getDataOnCurrentPlayback
    // getRecentlyPlayedTracks
    // getCurrentlyPlayedTrack
    // pauseUserPlayback
    // seekToPositionInPlayback
    // setPlaybackOnRepeat
    // setVolumeForUserPlayback
    // skipToNextTrack
    // skipToPreviousTrack
    // startUserPlayback
    // toggleShuffleForUserPlayback
    // transferUserPlayback
// Playlists
    // addTrackToPlaylist: done
    // changePlaylistDetails: done
    // getListOfCurrentUserPlaylists: done
    // getListOfUserPlaylist: done
    // getPlaylist: done
    // getPlaylistCover: done
    // getPlaylistTracks: done
    // removeTracksFromPlaylist: done
    // reorderPlaylistTracks: done
    // replacePlaylistTracks: done
    // uploadPlaylistCover: done
// Search : next
// Shows : Done
    // getShowData: done
    // getSeveralShowsData: done
    // getShowEpisodes: done
// Tracks: almost
    // getTrackAnalysis: done
    // getTrackFeatures: done
    // getSeveralTrackFeatures: done
    // getSeveralTrackData: almost
    // getTrackData: done
// Users profile: done
    // getCurrentUserProfile: done
    // getUserProfile: done

// https://dev.to/thomasstep/splitting-javascript-classes-into-different-files-359g
// https://github.com/neogeek/doxdox#layouts


class SpotifyAPI {
    constructor(accessToken) {
        this.accessToken = accessToken
    }

    // Behavior of API
    // Seems to respond with standard behavior when the body parameters that we pass have
    // undefined values (when no arguments were passed in the function call and even when the 
    // argument passed itself is undefined)
    // Let's see how it responds when the type of variable itself is erroneous (e.g. string instead
    // of integer or integer instead of string)
    // Seems to behave the same way when we pass undefined as when we pass nothing, which confirms
    // expectations
    // 400 bad request response status code when wrong variable type is inputted
    // The server cannot and will not process the request due to something perceived
    // as an error on the client side (e.g., malformed request syntax, etc.)


    // Gets a Category
    // @params: categoryID {string} (required): spotify category ID for the category. e.g. "party"
    // @params: country {string} (optional): ISO 3166-1 alpha-2 country code. provide it to ensure categ exists for a country
    // @params: locale {string} (optional): desired language consisting of ISO 639-1 language code and ISO 3166 country code
    // @example:
    // .getCategory("party") --> gets the single category "party" used to tag items in spotify
    // .getCategory("party", undefined, "es_MX") --> gets category returned in "Spanish (Mexico)"
    // @returns an object containing the category information
    //

    getCategory = async (categoryID, paramObject) => {
        let category;

        // let paramObject = {
        //     country: country,
        //     locale: locale
        // };

        try {
            let url = 'https://api.spotify.com/v1/browse/categories/' + categoryID;
            category = await axios.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + this.accessToken
                },
                params: paramObject
            })
        } catch (error) {
            console.error('Error returned from Spotify-API in getCategory function', error);
        }

        return category; 
    }


    //
    // Gets list of Spotify playlists tagged with a particular category
    // @params {string} categoryID (required) Spotify category ID for the category
    // @param {Object} paramObject [options] Object that can contain up to three optional keys: country, limit,
    // and offset. "country" should be a string string representing ISO 3166-1 alpha-2 country code.
    // limit should be an integer representing the max number of items to return. (default: 20, min: 1, max: 50).
    // offset should be an integer, representing the index of the first item to return (default: 0). 
    // @example:
    // .getCategoryPlaylists("party", {limit: 20}) --> Gets first 20 spotify "party" playlists
    // .getCategoryPlaylists("party", {offset: 20, country: 'FR'}) --> Gets party playlists 20-40 from France
    // @return {Object} An object containing playlists for that category
    // 
    getCategoryPlaylists = async (categoryID, paramObject) => {
        let categoryPlaylists;

        // let paramObject = {
        //     country: country,
        //     limit: limit,
        //     offset: offset
        // }

        try {
            let url = 'https://api.spotify.com/v1/browse/categories/';
            
            categoryPlaylists = await axios.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + this.accessToken
                },
                params: paramObject
            })
        } catch (error) {
            console.error('Error returned from Spotify-API in getCategoryPlaylists function', error);
        }

        console.log('Category Playlists are', categoryPlaylists);
        return categoryPlaylists; 
    }


    // 
    // Get a list of categories used to tag items in Spotify
    // Link: https://developer.spotify.com/documentation/web-api/reference/browse/get-list-categories/
    // @params: country {string} (optional): ISO 3166-1 alpha-2 country code
    // @params: locale {string} (optional): ISO 639-1 language code with ISO 3166-1 alpha-2 country code. e.g. "es_MX"
    // @params: limit {integer} (optional): max num of categories to return. default: 20, min: 1, max: 50.
    // @params: offset {integer} (optional): index of first item. default: 0 (first object). 
    // @example:
    // .getListOfCategories(undefined, undefined, 20, 20) --> Get 20 categories offset by 20 (so categories number 20-40)
    // .getListOfCategories("FR") ==> equivalent to: .getListOfCategories("FR", undefined, undefined, undefined) --> Gets default number of categories (20) for France
    // @returns an Object containing a list of categories
    // 
    getListOfCategories = async (country, locale, limit, offset) => {
        let listOfCategories;

        let paramObject = {
            country: country,
            locale: locale,
            limit: limit,
            offset: offset,
        }

        try {
            let url = 'https://api.spotify.com/v1/browse/categories/'
            
            listOfCategories = await axios.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + this.accessToken
                },
                params: paramObject
            })
        } catch (error) {
            console.error('Error returned from Spotify-API in getListOfCategories function', error);
        }

        console.log('Categories  are', listOfCategories);
        return listOfCategories; 
    }
    //
    // Retrieves New Releases
    // @params: limit {integer} (optional): number of releases to be retrieved. default: 20, min: 1, max: 50.
    // @params: country {string} (optional): an ISO 3166-1 alpha-2 country code. 
    // @params: offset {integer} (optional): the index of the first item to return. Default: 0
    // @example: 
    // .getNewReleases(10) --> Returns 10 first newest releases for all countries <=> equivalent to .getNewReleases(10, undefined, undefinded)
    // .getNewReleases(undefined, 'FR', 10) --> Gets top 10-30 newest track for France (ISO code: "FR")
    // .getNewReleases(10, undefined, 10) --> Gets # 10 to 20 newest release all over the world (10 is limit and offset is 10 so we start at track 10)
    // @returns An object newReleases containing the newest releases if the call to the API is successful 
    // 
    getNewReleases = async (limit, country, offset) => {
        
        try {
            let newReleases;

            let paramObject = {
                country: country,
                limit: limit,
                offset: offset,
            }
   
    
            try {
                let url = 'https://api.spotify.com/v1/browse/new-releases'
                newReleases = await axios.get(url, {
                    headers: {
                        'Authorization': 'Bearer ' + this.accessToken
                    },
                    params: paramObject
                })
            } catch (error) {
                console.error('Error returned from Spotify-API in GetNewReleases function', error);
            }
            console.log('New releases are', newReleases);
            return newReleases; 
        } catch (error) {
            console.error('Error found in GetNewReleases function: ', error)
        }

    }

    // 
    // Retrieve list of Spotify featuerd playlists
    // @params: locale {string} (optional): desired language as lowercase ISO 639-1 language code & uppercase ISO 3166-1 alpha-2
    // country code. e.g. es_MX --> "Spanish (Mexico)"
    // @params: country {string} (optional): ISO 3166-1 alpha-2 country code. if you want a list
    // of returned items to be relevant to a particular country. e.g. "FR"
    // @params: timestamp {string} (optional): ISO 8601 format --> yyyy-MM--ddTHH:mm:ss to get results
    // tailed for that specific time and day
    // @params: limit {integer} (optional): max num of items to return. default: 20, min: 1, max: 50.
    // @params: offset {integer} (optional): index of first item to return. default 0.
    // @returns: a featuredPlaylists object containing all the necessary data :)
    //
    getFeaturedPlaylists = async (locale, country, timestamp, limit, offset) => {
        let featuredPlaylists;

        let paramObject = {
            locale: locale,
            country: country,
            timestamp: timestamp,
            limit: limit,
            offset: offset,
        }

        try {
            let url = 'https://api.spotify.com/v1/browse/featured-playlists';
            featuredPlaylists = await axios.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + this.accessToken
                },
                params: paramObject
            })
        } catch (error) {
            console.error('Error returned from Spotify-API in getFeaturedPlaylists function', error);
        }
        console.log('New releases are', featuredPlaylists);
        return featuredPlaylists; 

    }

    // Important: add max_*, min_*, etc?

    // Get Recommendations from Seed Data
    // Link: https://developer.spotify.com/documentation/web-api/reference/browse/get-recommendations/
    // @params: limit {integer} (optional): target size of the list of recommended tracks. default: 20, min: 1, max: 100.
    // @params: market {string} (optional): ISO 3166-1 alpha-2 country code. 
    // @params: seedArtists {string} (required): comma separated list of spotify artists. up to 5 seed values.
    // @params seedGenres {string} (required): comma-separated list of any genres in teh set of available genre seeds.
    // up to 5 seed values.
    // @params: seedTracks {string} (required): comma-separed list of spotify IDs for a seed track. Up to 5 values.
    // @returns: recommendations object containing all of the recommendation data
    // Note: Only one type of seed data is required at minimum (e.g. seed_artists or seed_genres) but a combination
    // of all of them can be used together
    getRecommendations = async (limit, market, seedArtists, seedGenres, seedTracks) => {
        let recommendations;
        let paramObject = {
            limit: limit,
            market: market,
            seed_artists: seedArtists,
            seed_genres: seedGenres,
            seed_tracks: seedTracks,
        } 
        try {
            let url = 'https://api.spotify.com/v1/recommendations'
            recommendations = await axios.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + this.accessToken
                },
                params: paramObject
            })
        } catch (error) {
            console.error('Error caught in getRecommendations function', error);
        }
        console.log('New recommendations are', recommendations);
        return recommendations; 
    }

    // Get Featured Playlist
    getFeaturedPlaylist = async (locale, country, timestamp, limit, offset) => {
        let featuredPlaylist;
        let paramObject = {
            local: locale,
            country: country,
            timestamp: timestamp,
            limit: limit,
            offset: offset,
        };

        try {
            let url = 'https://api.spotify.com/v1/https://api.spotify.com/v1/browse/featured-playlists';
            featuredPlaylist = await axios.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + this.accessToken
                },
                params: paramObject
            })
        } catch (error) {
            console.error('Error caught in getFeaturedPlaylist function', error);
        }
        console.log('featuredPlaylist are', featuredPlaylist);
        return featuredPlaylist; 
    }

    // ALBUM RELATED METHODS

    // 
    // Retrieves specific album's data
    // Link: https://developer.spotify.com/documentation/web-api/reference/albums/get-album/
    // @params: albumID  {string} (required): spotify's ID for the album
    // @params: market {string} (optional): ISO 3166-1 alpha-2 country code
    // @returns: album object containing all album data
    //
    getAlbum = async (albumID, market) => {
        let album;
        let bodyParam = {
            market: market
        }
        try {
            let url =  'https://api.spotify.com/v1/albums/'+ albumID
            album = await axios.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + this.accessToken
                },
                params: bodyParam
            });
        } catch(error) {
            console.error('Error caught in the GetAlbum function', error);
        }
        return album;
    }

    //
    // Get tracks for an album
    // Link: https://developer.spotify.com/documentation/web-api/reference/albums/get-albums-tracks/
    // @params: albumID {string} (required) 
    // @params: limit {integer) (optional): max number of trackss to return. default = 20, min = 1, max = 50. 
    // @params: offset {integer} (optional): the index of the first track to return. default 0.
    // @params: market {string} (optional): an ISO 3166-1-alpha-2 country code (string)
    // @returns: an albumTracks object containing all of the album's track data
    // 
    getAlbumTracks = async (albumID, limit, offset, market) => {
        let albumTracks;
        let bodyParam = {
            limit: limit,
            offset: offset,
            market: market
        }
        try {
            let url =  'https://api.spotify.com/v1/albums/' + albumID + '/tracks'
            albumTracks = await axios.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + this.accessToken
                },
                params: bodyParam
            })
        } catch(error) {
            console.error('Error caught in the Get Album Tracks function');
        }
        return albumTracks;
    }

    //```
    // Retrieves information about several albums
    // Link:https://developer.spotify.com/documentation/web-api/reference/albums/get-several-albums/
    // @params: albumIdStrings {string} (required): comma-separated list of the spotify IDs for the album. max = 20.
    // @params: market {string} (optional): An ISO 3166-1 alpha-2 country code
    // @returns: albumIDs object containing all of the albums' data 
    // 
    getAlbums = async (albumIdStrings, market) => {
        let albumIDs;
        let bodyParam = {
            ids: albumIdStrings,
            market, market
        }
        try {
            let url =  'https://api.spotify.com/v1/albums'
            albumIDs = await axios.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + this.accessToken
                },
                params: bodyParam
            })
        } catch(error) {
            console.error('Error caught in the Get Album IDs function');
        }
        return albumIDs;
    }

    getArtist = async (artistID) => {
        let artistData;
        try {
            let url =  'https://api.spotify.com/v1/artists/' + artistID
            artistData = await axios.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + this.accessToken
                }
            })
        } catch(error) {
            console.error('Error caught in the GetArtist function', error);
        }
        return artistData;
    }

    // Include-groups is a comma separated list of keywords that are used to filter the response
    // if not supplied, all album types will be returned. Valid values are: "album", "single", "appears_on",
    // "compilation"
    getArtistAlbums = async (artistID, includeGroups, country, limit, offset) => {
        let artistAlbums;
        let bodyParam = {
            include_groups: includeGroups, 
            country: country,
            limit: limit,
            offset: offset
        }
        try {
            let url =  'https://api.spotify.com/v1/artists/' + artistID + '/albums';
            artistAlbums = await axios.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + this.accessToken
                },
                params: bodyParam
            })
        } catch(error) {
            console.error('Error caught in the getArtistAlbums function', error);
        }
        return artistAlbums;
    }

    // Important : change bodyParam to queryParam
    getArtistTopTracks = async (artistID, country) => {
        let artistTopTracks;
        let queryParam = {
            country: country
        }
        try {
            let url =  'https://api.spotify.com/v1/artists/' + artistID + '/top-tracks';
            artistTopTracks = await axios.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + this.accessToken
                },
                params: queryParam
            })
        } catch(error) {
            console.error('Error caught in the getArtistTopTracks function', error);
        }
        return artistTopTracks;
    }

    // https://developer.spotify.com/documentation/web-api/reference/artists/get-related-artists/
    getRelatedArtists = async (artistID) => {
        let relatedArtists;
        try {
            let url =  'https://api.spotify.com/v1/artists' + artistID + '/related-artists';
            relatedArtists = await axios.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + this.accessToken
                }
            })
        } catch(error) {
            console.error('Error caught in the getRelatedArtists function', error);
        }
        return relatedArtists;
    }

    // https://developer.spotify.com/documentation/web-api/reference/artists/get-several-artists/
    // Important: or getArtists 
    // ids: comma-sepaarated list of the Spotify-IDs for the artsits. MAximum 50 IDs.
    getSeveralArtists = async (artistIDs) => {
        let artistsData;
        let queryParam = {
            ids: artistIDs
        }

        try {
            let url =  'https://api.spotify.com/v1/artists';
            artistsData = await axios.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + this.accessToken
                },
                params: queryParam
            })
        } catch(error) {
            console.error('Error caught in the getSeveralArtists function', error);
        }
        return artistsData;
    }

    // 
    // getEpisode()
    //
    // Gets Spotify catalog info for a single episode identified by its unique Spotify ID
    // Link: https://developer.spotify.com/documentation/web-api/reference/episodes/get-an-episode/
    //
    // @params: episodeID {string} (required): based 64 identifier representing the spotify ID for the episode
    // @params: market {string} (required): an ISO 3166-1 alpha-2 country code. 
    // If a country is specified, only shows and episodes available in that country are returned
    // If a valid user access token is specified in the request header, the country associated w/ theuser account will 
    // take priority over this parameter
    //
    // @returns an object containing information about the specified episode (duration, description, images, etc.)
    // 
    getEpisode = async(episodeID, market) => {
        let episodeData;

        let queryParam = {
            market: market
        }

        try {
            let url = 'https://api.spotify.com/v1/episodes/' + episodeID;
            episodeData = await axios.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + this.accessToken
                },
                params: queryParam
            })
        } catch(error) {
            console.error('Error caught in getEpisode function', error);
        }
        
        console.log('Episode data',episodeData);
        return episodeData
    }


    // 
    // getSeveralEpisodes()
    //
    // Gets Spotify catalog information for multiple episodes based on their Spotify ID
    // Link: https://developer.spotify.com/documentation/web-api/reference/episodes/get-several-episodes/
    //
    // @params: ids {string} (required): comma-separated list of Spotify IDs for teh episodes. max: 50 IDs.
    // @params: market {string} (optional): ISO 3166-1 alpha-2 country code: If country code is specified, only shows and epsiodes available
    // in that market will be returned. same other rules apply as in .getEpisode method.
    // More info can be found in the above link
    // 
    // @returns an object contain the several episode's respective information
    //
    getSeveralEpisodes = async(listOfEpisodeIDs, market) => {
        let severalEpisodeData;

        let queryParam = {
            ids: listOfEpisodeIDs,
            market: market
        }

        try {
            let url = 'https://api.spotify.com/v1/episodes/';
            severalEpisodeData = await axios.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + this.accessToken
                },
                params: queryParam
            })
        } catch(error) {
            console.error('Error caught in getSeveralEpisodes function', error);
        }
        
        console.log('Several episodes data', severalEpisodeData);
        return severalEpisodeData
    }

    //
    // getUserTop()
    // 
    // Gets the current user's top artists or tracks based on calculated affinity
    // Link: https://developer.spotify.com/documentation/web-api/reference/personalization/get-users-top-artists-and-tracks/
    //
    // @params: type {string} (required): Only two options "artists" or "tracks"
    // @params: limit {integer} (optional): Num of entities to return. Default: 20, min: 1, max: 50.
    // @params: offset {integer} (optional): Index of first entity to return. Default: 0 (the first track)
    // @params: timeRange {string} (optional): over what time frame affinities are computed.
    // Valid values include "long_term" (several years of data), "medium_term" (-6 months of data), "short_term" (-4 weeks)
    // 
    // @example:
    // .getUserTop("artists", 30) --> Get's user's top 30 artists
    // .getUserTop("tracks", 40, undefined, "short_term") --> Get's user's top 40 tracks over past 4 weeks
    // .getUserTop("tracks", undefined, undefined, "long_term") --> Gets user's top tracks over past several years
    // .getUserTop("artists") --> Get's user's top artists over medium_term (which is default value)
    //
    // @returns an object containing top user track's or artists
    // 
    getUserTop = async (type, paramObject) => {
        let userTopTracks;

        try {
            let url = 'https://api.spotify.com/v1/me/top/' + type;
            userTopTracks = await axios.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + this.accessToken
                },
                params: paramObject
            })
        } catch(error) {
            console.error(`Error caught in getUserTopTracks function: ${error}`)
        }

        return userTopTracks;
    }

    // Playlists API Endpoints //

    /*
    * Add Tracks to a Playlist
    * More details at [Add Tracks to a Playlist](https://developer.spotify.com/documentation/web-api/reference/playlists/add-tracks-to-playlist/)
    * 
    * @param {string} playlistID Spotify ID for the playlist
    * @param {Array<string>} trackIDArray [options] Array of track ID strings
    * @param {Object} [options] paramObject Optional param object that contains a "position" attribute, which is an integer
    * representing the position where to insert the tracks. Uses zero-based index, so position = 0 is equivalent to inserting 
    * tracks in the first position 
    * 
    * @return {Object} Object with status code 201 in the response header for created. Trying to add track when you don't have
    * user permissions or when there are more than 10,000 tracks in playlist returns error 403.
    */
    addTracksToPlaylist = async(playlistID, trackIDArray, paramObject) => {
        let addTrackResponse;


        let queryParam = {
            uris: trackIDArray.join(','),
            position: paramObject == undefined ? undefined : paramObject.position,
        }
        // Or post?

        try {
            let url = `https://api.spotify.com/v1/playlists/${playlistID}/tracks`;
            addTrackResponse = await axios.post(url, {
                headers: {
                    'Authorization': 'Bearer ' + this.accessToken
                },
                params: queryParam
            })
        } catch(error) {
            console.error(`Error caught in addTracksToPlaylist function ${error}`);
        }
        return addTrackResponse;
    }

    /*
    *
    * Change Playlist's Details
    * More details [here](https://developer.spotify.com/documentation/web-api/reference/playlists/change-playlist-details/)
    * 
    * @param {string} playlistID Spotify ID of the playlist
    * @param {Object} optionalParam Optional object that can contain up to four attributes: name (string), public (boolean), collaborative(boolean)
    * and description (string). name is the new name for teh playlist, setting public to true will make the playlist public, setting it to false will make
    * it private. setting collaborative to true will make the playlist collaborative. finally, adding a description will change the description of the playlist.
    * 
    * @return {Object} Object with status code 200 if successful. Error object if unsuccessful. 
    * 
    */

    changePlaylistDetails = async (playlistID, optionalParam) => {
        let responseObject;

        try {
            let url = `https://api.spotify.com/v1/playlists/${playlistID}`;
            responseObject = await axios.put(url, {
                headers: {
                    'Authorization': 'Bearer ' + this.accessToken,
                    'Content-Type': 'application/json',
                },
                data: {
                    name: optionalParam != undefined && optionalParam.name ? optionalParam.name : undefined,
                    public: optionalParam != undefined && optionalParam.public ? optionalParam.public : undefined,
                    collaborative: optionalParam != undefined && optionalParam.collaborative ? optionalParam.collaborative : undefined,
                    description: optionalParam != undefined && optionalParam.description ? optionalParam.description : undefined,
                }
            })
        } catch (error) {
            return error;
        }
        return responseObject;
    }

    /*
    *
    * Create a Playlist
    * More details [here](https://developer.spotify.com/documentation/web-api/reference/playlists/create-playlist/)
    * 
    * @param {string} userID User's Spotify ID
    * @param {string} name Name for the new playlist. E.g. "Calabasas Banger$ Playlist"
    * @param {Object} [options] Optional object that can contain up to three attributes: public (boolean), collaborative(boolean) and 
    * description (string). setting public to true will make the playlist public, setting it to false will make  it private. setting
    * collaborative to true will make the playlist collaborative. finally, adding a description will change the description of the 
    * playlist.
    * 
    * @return {Object} Containing the playlist object in JSON format and status code 200 or 201 (created) if request successful.
    * Error object returned if unsuccessful.
    * 
    */

    createPlaylist = async (userID, name, optionalParam) => {
        let responseObject;
        try {
            let url = `https://api.spotify.com/v1/users/${userID}/playlists`;
            responseObject = await axios.post(url, {
                headers: {
                    'Authorization': 'Bearer ' + this.accessToken,
                    'Content-Type': 'application/json',
                },
                data: {
                    name: name,
                    public: optionalParam != undefined && optionalParam.public ? optionalParam.public : undefined,
                    collaborative: optionalParam != undefined && optionalParam.collaborative ? optionalParam.collaborative : undefined,
                    description: optionalParam != undefined && optionalParam.description ? optionalParam.description : undefined,
                }
            })
        } catch (error) {
            return error;
        }  
        return responseObject;
    } 


    /*
    * Get a List of Current User's Playlists
    * More details at [Get List of Current User's Playlist](https://developer.spotify.com/documentation/web-api/reference/playlists/get-a-list-of-current-users-playlists/)
    * 
    * @param {Object} [optional] Optional object that can contain up to two attributes "limit", an integer representing the max number of playlists to return 
    * (max: 50, default: 20, min: 1) and "offset", which is the index of the first playlist to return (Default: 0, Max offset: 100,000)
    * 
    * @return {Object} Object with status code 200 OK in response header and response body contains an array of simplified playlist objects in JSON format
    * 
    */
   getCurrentUserPlaylist = async (paramObject) => {
        let currentUserPlaylist;

        try {
            let url = 'https://api.spotify.com/v1/me/playlists'
            currentUserPlaylist = await axios.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + this.accessToken
                },
                params: paramObject 
            })
        } catch (error) {
            console.error(`Error found in getCurrentUserPlaylist function ${error}`)
        }
        return currentUserPlaylist;
   }

    /*
    * Get a List of Public User's Playlists
    * More details at [Get List of User's Playlist](https://developer.spotify.com/documentation/web-api/reference/playlists/get-list-users-playlists/)
    * 
    * @param {Object} [optional] Optional object that can contain up to two attributes "limit", an integer representing the max number of playlists to return 
    * (max: 50, default: 20, min: 1) and "offset", which is the index of the first playlist to return (Default: 0, Max offset: 100,000)
    * 
    * @return {Object} Object with status code 200 OK in response header and response body contains an array of simplified playlist objects in JSON format
    * 
    */
   getUserPlaylist = async (userID, paramObject) => {
        let userPlaylist;

        try {
            let url = `https://api.spotify.com/v1/users/${userID}/playlists`
            userPlaylist = await axios.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + this.accessToken
                },
                params: paramObject 
            })
        } catch (error) {
            console.log(`Error found in getUserPlaylist function ${userPlaylist}`)
        }
        return userPlaylist;
   } 

   /*
   *
   * Get Playlist 
   * More details can be found at [Get a Playlist](https://developer.spotify.com/documentation/web-api/reference/playlists/get-playlist/)
   * 
   * @param {string} playlistID Spotify ID for the playlist
   * @param {Object} paramObject [options] Optional object that can contain up to three attributes 1. "fields" (string), which is a comma-separated
   * list of the fields to return. e.g. 'descriptio, uri'., 2. 'market' (string), represneting an ISO 3166-1 alpha-2 country code,
   * and 3. "additional_types", which is a comma-separated list of item types that your client supports (valid types are 'track' and 'episode')
   * 
   * @return {Object} An object which contains a playlist object in JSON format and HTTP status code in header 200 if response successful.
   * 
   */
   getPlaylist = async (playlistID, paramObject) => {
       let playlist;

       try {
           let url = `https://api.spotify.com/v1/playlists/${playlistID}`
           playlist = await axios.get(url, {
            headers: {
                'Authorization': 'Bearer ' + this.accessToken
            },
            params: paramObject 
        })
       } catch (error) {
           console.log(`Error found in getPlaylist function ${error}`)
       }
       return playlist;
   }


   /*
   * Get a Playlist Cover Image
   * More details can be found at [Get a Playlist Cover Image](https://developer.spotify.com/documentation/web-api/reference/playlists/get-playlist-cover/)
   * 
   * @param {string} playlistID Spotify ID for the playlist
   * 
   * @return {Object} A list of image objects in JSON format if request successful. Object with error code in header and error object if unsuccessful.
   */
   getPlaylistCoverImage = async (playlistID) => {
        let playlistImage;

        try {
            let url = `https://api.spotify.com/v1/playlists/${playlistID}/images`
            playlistImage = await axios.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + this.accessToken
                }
            })
        } catch (error) {
            console.error(`Error found in getPlaylistCoverImage function ${error}`);
        }
        return playlistImage;
   }


   /*
   *
   * Get a Playlist's tracks
   * More details can be found at [Get a Playlist's Tracks]()
   * 
   * @param {string} playlistID Spotify ID for the playlist
   * @param {Object} queryParam Objec containingoptional parameters that can be passed in, including
   * "fields", "limit", "offset", "market", "additional_types"
   * @example
   * .getPlaylistTracks('21THa8j9TaSGuXYNBU5tsC', {limit: 50}) --> Gets 50 tracks from passed in playlist
   * 
   * @return {Object} On success, response body contains an arra of track objects and episode objects (depending on additional_types parameter)
   * On error code, error code in header and error object in response body.
   * 
   */
   getPlaylistTracks = async (playlistID, queryParam) => {
       let playlistTracks;

       try {
            let url = `https://api.spotify.com/v1/playlists/${playlistID}/tracks`
            playlistTracks = await axios.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + this.accessToken
                },
                params: queryParam
            })
        } catch (error) {
           console.error(`Error encountered in getPlaylistTracks function ${error}`);
       }
       return playlistTracks;
   }


   /*
   *
   * Remove Track From Playlist
   * More details can be found at [Remove Track From Playlist]
   * 
   * @param {string} playlistID Spotify ID of the playlist
   * @param {Array<string>} trackURIArray Array of the track's URIs e.g. ["spotify:track:4iV5W9uYEdYUVa79Axb7Rh", "spotify:track:1301WleyT98MSxVHPZCA6M" ]
   * 
   * @return An object containing "snapshot_id" in JSON format and success status 200 if successful.
   * "snapshot_id" can be used to identify playlsit version in future requests.  If bad request, 400 returned,
   * if forbidden request, 403 returned in error object.
   */
   removeTracksFromPlaylist = async (playlistID, trackURIArray) => {
        let responseObject;
        let newTrackArray = trackURIArray.map((uri) => {
            if (typeof uri === 'string') {
                return {uri: uri};
            } else {
                return uri;
            }
        })

        try {
            let url = `https://api.spotify.com/v1/playlists/${playlistID}/tracks`;
            responseObject = await axios.delete(url, {
                headers: {
                    'Authorization': 'Bearer ' + this.accessToken,
                    'Content-Type': 'application/json',
                },
                data: {
                    tracks: newTrackArray
                }
            })
        } catch (error) {
            console.error(`Error encountered in removeTrackFromPlaylist ${error} `)
        }
        return responseObject;
   }

   /*
   *
   * Reorder a Playlist's Tracks
   * More information can be found at [Reorder a Playlist's Tracks](https://developer.spotify.com/documentation/web-api/reference/playlists/reorder-playlists-tracks/)
   * 
   * @param {string} playlistID Spotify ID for the playlist
   * @param {integer} rangeStart Position of the first track to be reordered
   * @param {integer} insertBefore Position where the track/tracks should be inserted.
   * @param {Object} optionalParam Optional object that can contain up to two attributes: 'insertBefore' and 'snapshotID'.
   * 'insertBefore' represents the position (integer) where the track/tracks should be inserted. 'snapshotId' represents the playlist's
   * snapshotID (string) against which you want to make changes
   * 
   * @return {Object} Containing a snapshot_id in JSON format and the HTTP status code in response header is 200 OK. If error, error object returned.
   */

  // #toDo: change all optional parameters to optionalParam

   reorderPlaylistTracks = async (playlistID, rangeStart, insertBefore, optionalParam) => {
       let responseObject;
       try {
           let url = `https://api.spotify.com/v1/playlists/${playlistID}/tracks`;
           responseObject = await axios.put(url, {
                headers: {
                    'Authorization': 'Bearer ' + this.accessToken,
                    'Content-Type': 'application/json',
                },
                data: {
                    range_start: rangeStart,
                    insert_before: insertBefore,
                    range_length: optionalParam != undefined && optionalParam.rangeLength ? optionalParam.rangeLength : undefined,
                    snapshot_id: optionalParam != undefined && optionalParam.snapshotID ? optionalParam.snapshotID : undefined,
                }
           })
       } catch (error) {
           console.error(`Error encountered in reorderPlaylistTracks ${responseObject}`);
       }
       return responseObject;
    }

    /*
    *
    * Replace a Playlist's Tracks
    * More details [here](https://developer.spotify.com/documentation/web-api/reference/playlists/replace-playlists-tracks/)
    * 
    * @param {string} playlistID Spotify ID for the playlist
    * @param {Array<string>} trackURIArray Array of track URIs that will be in the playlist selected
    * 
    * @response {Object} With status code 201 in header if successful. Error object with error code returned if unsuccessful.
    * 
    */
    replacePlaylistTracks = async (playlistID, trackURIArray) => {
        let responseObject;

        let queryParam = {
            uris: trackURIArray.join(',')
        }

        try {
            let url = `https://api.spotify.com/v1/playlists/${playlistID}/tracks`;
            responseObject = await axios.put(url, {
                headers: {
                    'Authorization': 'Bearer ' + this.accessToken
                },
                params: queryParam
            })
        } catch (error) {
            return error;
        }
        return responseObject;
    }

    // #toFix #toDo: maybe data is wrong thing, maybe it's body taht I need to put instead

    /*
    *
    * Upload Playlist Cover Image
    * More details can be found [here](https://developer.spotify.com/documentation/web-api/reference/playlists/create-playlist/)
    * 
    * @param {string} playlistID Spotify ID for the playlist
    * @param {string} imageJPEG Base64 encoded JPEG image data, max payload size is 256 KB.
    * 
    * 
    */
    uploadPlaylistImage = async(playlistID, imageJPEG) => {
        let responseObject;

        try {
            let url = `https://api.spotify.com/v1/playlists/${playlistID}/images`;
            responseObject = await axios.put(url,{
                headers: {
                    'Authorization': 'Bearer ' + this.accessToken,
                    'Content-Type': 'image/jpeg',
                },
                body: imageJPEG
            })
        } catch (error) {
            return error;
        }
        return responseObject;
    }
    // LIBRARY API ENDPOINTS


    //
    // 
    // Check if one or more albums is already saved in current Spotify user's 'Your Music' library
    // Link: https://developer.spotify.com/documentation/web-api/reference/library/check-users-saved-albums/
    //
    // @param {Array<string>} albumIDs Array of one or more album's Spotify IDs
    // @example
    // .checkIfAlbumSaved(['0pJJgBzj26qnE1nSQUxaB0,5ZAKzV4ZIa5Gt7z29OYHv0, 8744Bzj26Adjeieo5ZAKzV4ZIa5Gt7z29OYHv0]) 
    // --> Checks if these two albums are in saved for current user
    //
    // @return {Object} An object containing a JSON array of true or false values in the same order in which the ids were specified
    // e.g. [true, false]
    //
    checkIfAlbumSaved = async(albumIDs) => {
        let areAlbumSavedArray;
        
        let queryParam = {
            ids: albumIDs.join(','),
        }
        
        try {
            let url = 'https://api.spotify.com/v1/me/albums/contains';
            areAlbumSavedArray = await axios.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + this.accessToken
                },
                params: queryParam
            })
        } catch (error) {
            console.error('Error caught in checkIfAlbumSaved function', error);
        }

        return areAlbumSavedArray
    }


    // Important: pretty sure examples don't count here, but keep them for NPM page
    //
    // Check if one or more shows is already saved in current Spotify user's library
    // More information at [Check User's Saved Albums] (https://developer.spotify.com/documentation/web-api/reference/library/check-users-saved-shows/)
    //
    // @param {Array<string>} showIDs Array of one or more Shows' Spotify ID
    // @example
    // .checkIfShowSaved(['5AvwZVawapvyhJUIx71pdJ', '2C6ups0LMt1G8n81XLlkbsPo,2C5AvwZVawapvyhJUIx71pdJ'])
    //
    // @returns {Object} An object containing a JSON array of true or false values in same order in which the ids were specified
    // e.g. [true, false]
    //

    checkIfShowSaved = async(showIDs) => {
        let isShowSavedArray;
        
        let queryParam = {
            ids: showIDs.join(',')
        }
        
        try {
            let url = 'https://api.spotify.com/v1/me/shows/contains';
            isShowSavedArray = await axios.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + this.accessToken
                },
                params: queryParam
            })


        } catch (error) {
            console.error('Error caught in checkIfShowSaved function', error);
        }
        return isShowSavedArray;
    }

    //
    // 
    // Check if one or more tracks is already saved in the current Spotify user’s ‘Your Music’ library.
    // More information at [Check User's Saved Tracks](https://developer.spotify.com/documentation/web-api/reference/library/check-users-saved-tracks/)
    //
    // @param {Array<string>} Array of one or more track's Spotify IDs. Max: 50 IDs.
    // @example
    // .checkIfTrackSaved(['0udZHhCi7p1YzMlvI4fXoK' , '3SF5puV5eb6bgRSxBeMOk9'])
    //
    // @return {Object} Object containing a JSON array of true or false values in same order in which the IDs were specified.
    // e.g. [true]
    //

    checkIfTrackSaved = async (trackIDs) => {
        let isTrackSavedArray;
        
        let queryParam = {
            ids: trackIDs.join(','),
        }
        
        try {
            let url = 'https://api.spotify.com/v1/me/tracks/contains';
            isTrackSavedArray = await axios.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + this.accessToken
                },
                params: queryParam
            })


        } catch (error) {
            console.error('Error caught in checkIfTrackSaved function', error);
        }
        return isTrackSavedArray;
    }


    // 
    // Gets a list of the albums saved in the current Spotify user's 'Your Music' library
    // More details can be found at [Get Current User's Saved Albums](https://developer.spotify.com/documentation/web-api/reference/library/get-users-saved-albums/)
    //
    // @param {Object} [options] Optional object that can contain up to three properties including: "limit", which is an 
    // integer setting the max num of objects to return, "offset", which represents the index of the first object
    // to return, and "market", which is an optional ISO 3166-1 alpha-2 country code
    //
    // @example
    //.getUserSavedAlbums({market: 'FR', limit: 50}) --> Returns 50 albums from France saved for the current user
    // 
    // @return {Object} An object containing an array of album objects in JSON format. Each album object is accompanied by timestamp to 
    // show when it was added. More information in the above link.
    //

    getUserSavedAlbums = async (queryParam) => {
        let savedAlbums;


        try {
            let url = 'https://api.spotify.com/v1/me/albums'
            savedAlbums = await axios.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + this.accessToken
                },
                params: queryParam
            })
        } catch (error) {
            console.error('Error caught in the getUserSavedAlbums', error);
        }

        console.log('Albums saved by user ', savedAlbums);
        return savedAlbums;
    }


    // 
    // Gets a list of the shows saved in the current spotify user's library
    // More details can be found at [Get User's Saved Shows](https://developer.spotify.com/documentation/web-api/reference/library/get-users-saved-shows/)
    //
    // @param {Object} [options] Optional object that can contain up to three properties including: "limit", which is an 
    // integer setting the max num of objects to return, "offset", which represents the index of the first object
    // to return, and "market", which is an optional ISO 3166-1 alpha-2 country code
    //
    // @example
    //.getUserSavedShows({market: 'GB', limit: 10}) --> Returns 10 shows from Great Britain saved for the current user
    // 
    // @return {Object} An object containing an array of saved show objects in JSON format. If user does not have any shows saved, response will
    // be an empty array. If show is unavailable in a given market, it's filtered out. 
    //

    getUserSavedShows = async (queryParam) => {
        let savedShows;

        try {
            let url = 'https://api.spotify.com/v1/me/shows'
            savedShows = await axios.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + this.accessToken
                },
                params: queryParam
            })
        } catch (error) {
            console.error('Error caught in the getUserSavedShows', error);
        }

        console.log('Shows saved by user ', savedShows);
        return savedShows;
    }
    
    

    // 
    // Gets a list of the tracks saved in the current spotify user's 'Your Music' library
    // More details can be found at [Get User's Saved Tracks](https://developer.spotify.com/documentation/web-api/reference/library/get-users-saved-tracks/)
    //
    // @param {Object} [options] Optional object that can contain up to three properties including: "limit", which is an 
    // integer setting the max num of objects to return, "offset", which represents the index of the first object
    // to return, and "market", which is an optional ISO 3166-1 alpha-2 country code
    //
    // @example
    //.getUserSavedShows({market: 'SP'}) --> Returns 20 Tracks (default number) from Spain saved for the current user
    //
    // @return {Object} An object containing an array of saved track objects in JSON format. More details can be found in the link above.
    //

    getUserSavedTracks = async (limit, offset, market) => {
        let savedTracks;

        let queryParam = {
            limit: limit, 
            offset: offset,
            market: market
        }

        try {
            let url = 'https://api.spotify.com/v1/me/tracks'
            savedTracks = await axios.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + this.accessToken
                },
                params: queryParam
            })
        } catch (error) {
            console.error('Error caught in the getUserSavedTracks', error);
        }

        console.log('Tracks saved by user ', savedTracks);
        return savedTracks;
    }

    // Test this function here again

    // 
    // Removes one or more albums from current user's 'Your Music' library
    // 
    // @param {Array<string>} albumIDs Array of one or more album IDs to be deleted from user's library
    //
    // @return {Object} An object containing a response header 200 if successful. Error code returned if error encoutered.
    //

    // Important, tell spotify that the Remove User's Saved Shows vs. Removed User's Album doc is inconsistent.
    removeAlbums = async (albumIDs) => {
        let responseBody;

        let queryParam = {
            ids: albumIDs.join(','),
        }

        try {
            let url = 'https://api.spotify.com/v1/me/albums'
            responseBody = await axios.delete(url, {
                headers: {
                    'Authorization': 'Bearer ' + this.accessToken,
                },
                params: queryParam
            })

        } catch (error) {
            console.error('Error caught in removeAlbums function', error);
        }

        return responseBody;

    }


    // 
    // Removes one or more shows from current user's library
    // More details can be found at [Remove User's Saved Shows](https://developer.spotify.com/documentation/web-api/reference/library/remove-shows-user/) 
    //
    // @param {Array<string>} showIDs Array of one or more show IDs to be deleted from user's library
    //
    // @return {Object} An object containing a response header 200 if successful. Error code returned if error encoutered.
    //

    removeShows = async (showIDs) => {
        let responseBody;

        let queryParam = {
            ids: showIDs.join(','),
        }

        try {
            let url = 'https://api.spotify.com/v1/me/shows'
            responseBody = await axios.delete(url, {
                headers: {
                    'Authorization': 'Bearer ' + this.accessToken,
                },
                params: queryParam
            })

        } catch (error) {
            console.error('Error caught in removeShows function', error);
        }
        return responseBody;
    }


    // 
    // Removes one or more tracks from current user's library
    // More details can be found at [Remove User's Saved Tracks](https://developer.spotify.com/documentation/web-api/reference/library/remove-tracks-user/)
    //
    // @param {Array<string>} trackIDs Array of one or more track IDs to be deleted from user's library
    //
    // @return {Object} An object containing a response header 200 if successful. Error code returned if error encoutered.
    //
    removeTracks = async (trackIDs) => {
        let responseBody;

        let queryParam = {
            ids: trackIDs.join(','),
        }

        try {
            let url = 'https://api.spotify.com/v1/me/tracks'
            responseBody = await axios.delete(url, {
                headers: {
                    'Authorization': 'Bearer ' + this.accessToken,
                },
                params: queryParam
            })

        } catch (error) {
            console.error('Error caught in removeTracks function', error);
        }
        return responseBody;
    }

    // 
    // Save one or more albums to the current user's 'Your Music' library
    // More details can be found at [Save Album For Current User](https://developer.spotify.com/documentation/web-api/reference/library/save-albums-user/)
    //
    // @param {Array<string>} albumIDs Array of one or more album Spotify IDs to be added to user's library
    //
    // @return {Object} An object containing a response header 201 (created) if successful. Error code returned if error encoutered.
    // 403 Forbidden is returned if user did not provide authorization.
    //

    // 
    // Save one or more shows to the current user's library
    // More details can be found at [Save Shows For Current User](https://developer.spotify.com/documentation/web-api/reference/library/save-shows-user/)
    //
    // @param {Array<string>} showIDs Array of one or more show Spotify IDs to be added to user's library
    //
    // @return {Object} An object containing a response header 200 if successful. Error code returned if error encoutered.
    // 403 Forbidden is returned if user did not provide authorization or if more than 10,000 items saved in library.
    //
    saveShows = async (showIDs) => {
        let responseBody;

        let queryParam = {
            ids: showIDs.join(','),
        };

        try {
            let url = 'https://api.spotify.com/v1/me/shows'
            responseBody = await axios.put(url, {
                headers: {
                    'Authorization': 'Bearer ' + this.accessToken,
                },
                params: queryParam
            })

        } catch (error) {
            console.error('Error caught in saveShows function', error);
        }
        return responseBody;
    }

    // 
    // Save one or more tracks to the current user's library
    // More details can be found at [Save Tracks For Current User](https://developer.spotify.com/documentation/web-api/reference/library/save-tracks-user/)
    //
    // @param {Array<string>} trackIDs Array of one or more track Spotify IDs to be added to user's library
    //
    // @return {Object} An object containing a response header 200 if successful. Error code returned if error encoutered.
    // 403 Forbidden is returned if user did not provide authorization or if more than 10,000 items saved in library.
    //
    saveTracks = async (trackIDs) => {
        let responseBody;

        let queryParam = {
            ids: trackIDs.join(','),
        };

        try {
            let url = 'https://api.spotify.com/v1/me/tracks'
            responseBody = await axios.put(url, {
                headers: {
                    'Authorization': 'Bearer ' + this.accessToken,
                },
                params: queryParam
            })

        } catch (error) {
            console.error('Error caught in saveTracks function', error);
        }
        return responseBody;
    }

    // FOLLOW ENDPOINTS


    // 
    // Checks to see if the current user is following one or more artists. 
    // See [Check If Current User Follows Artist or Users](https://developer.spotify.com/documentation/web-api/reference/follow/check-current-user-follows/)
    // on the Spotify developer site for more information.
    // 
    // @param {Array<string>} artistIDs (required) Array of artists' spotify IDs. Max of 5O Ids can be sent in one request.
    // @example .isFollowingArtists(['74ASZWbe4lXaubB36ztrGX', '08td7MxkoHQkXnWAYD8d6Q']) 
    //
    // @return {Object} Containing a JSON array of true or false values, in the same order in which the IDs were specified
    // 
    isFollowingArtists = async (artistIDs) => {
        let isFollowingArtist;

        let queryParam = {
            type: 'artist',
            ids: artistIDs.join(',')
        };

        try {
            let url = 'https://api.spotify.com/v1/me/following/contains';
            isFollowingArtist =  await axios.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + this.accessToken
                },
                params: queryParam
            })
        } catch(error) {
            console.error('Error caught in isFollowingArtists function', error);
        }
        return isFollowingArtist;
    }

    
    // 
    // Checks to see if the current user is following one or more users. 
    // See [Check If Current User Follows Artist or Users](https://developer.spotify.com/documentation/web-api/reference/follow/check-current-user-follows/)
    // on the Spotify developer site for more information.
    // 
    // @param {Array<string>} userIDs (required) Array of users' Spotify IDs. Max of 5O IDs can be sent in one request.
    // @example .isFollowingUsers(['74ASZWbe4lXaubB36ztrGX', '08td7MxkoHQkXnWAYD8d6Q']) 
    //
    // @return {Object} Containing a JSON array of true or false values, in the same order in which the IDs were specified
    // 
    isFollowingUsers = async (userIDs) => {
        let isFollowingUser;

        let queryParam = {
            type: 'user',
            ids: userIDs.join(',')
        }

        try {
            let url = 'https://api.spotify.com/v1/me/following/contains';
            isFollowingUser =  await axios.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + this.accessToken
                },
                params: queryParam
            })
        } catch(error) {
            console.error('Error caught in isFollowingUsers function', error);
        }
        return isFollowingUser;
    }

    // 
    // 
    // Checks to see if one or more Spotify users are following a Spotify playlist
    // See [Check If Users follow Playlist](https://developer.spotify.com/documentation/web-api/reference/follow/check-user-following-playlist/)
    // on the Spotify developer site for more information.
    // 
    // @param {string} playlistID (required) The Spotify ID of the playlist
    // @param {Array<string>} userIDs (required) Array of users' Spotify IDs. Max of 5 IDs.
    // @example .isFollowingUsers(['74ASZWbe4lXaubB36ztrGX', '08td7MxkoHQkXnWAYD8d6Q']) 
    //
    // @return {Object} Containing a JSON array of true or false values, in the same order in which the IDs were specified
    // 
    checkIfUsersFollowPlaylist = async (playlistID, userIDs) => {
        let areUsersFollowingArray;

        let queryParam = {
            ids: userIDs.join(','),
        }
        try {
            let url = 'https://api.spotify.com/v1/playlists/'+ playlistID +'/followers/contains'
            areUsersFollowingArray =  await axios.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + this.accessToken
                },
                params: queryParam
            })
        } catch(error) {
            console.error('Error caught in checkIfUsersFollowPlaylist function', error);
        }
        return areUsersFollowingArray;
    }

    // 
    // Important: come back to this, unsure about the query vs. body parameter
    //
    // Adds the current user as a follower of one or more artist.
    // See [Follow Artists or User](https://developer.spotify.com/documentation/web-api/reference/follow/follow-artists-users/)
    // on the Spotify Developer site for more information
    //
    // @param {Array<string>} artistIDs: Array of the artists' Spotify IDs. Maximum of 50 IDs can be sent in one request.
    // @
    followArtist = async (artistIDs) => {
        let serverResponse;

        let queryParam = {
            type: 'artist',
            ids: artistIDs
        }
        try {
            let url = 'https://api.spotify.com/v1/me/following'
            serverResponse =  await axios.put(url, {
                headers: {
                    'Authorization': 'Bearer ' + this.accessToken,
                    'Content-Type': 'application/json',
                },
                params: queryParam
            })
        } catch(error) {
            console.error('Error caught in followArtist function', error);
        }
        return serverResponse;
    }


    // Same as above
    followUser = async (spotifyIDs) => {
        let serverResponse;

        let queryParam = {
            type: 'user',
            ids: spotifyIDs
        }
        try {
            let url = 'https://api.spotify.com/v1/me/following'
            serverResponse =  await axios.put(url, {
                headers: {
                    'Authorization': 'Bearer ' + this.accessToken
                },
                params: queryParam
            })
        } catch(error) {
            console.error('Error caught in followUser function', error);
        }
        return serverResponse;
    }
    
    // 
    // Adds the current user as a follower of a playlist. More information can be found
    // at [Follow a Playlist](https://developer.spotify.com/documentation/web-api/reference/follow/follow-playlist/)
    // on the Spotify Developer Site
    // 
    // @param {string} (required) Spotify ID of the playlist. Any playlist can be followed
    // ,regardless of its private/public status, as long as you know the playlist ID
    // @param {Object} [options] queryParam You can add an object with the attribute "public", which is a boolean 
    // that'll decide whether the newly followed playlist should be in the user's public or private playlist.
    // @example .followPlaylist('2v3iNvBX8Ay1Gt2uXtUKUT', { public: false }) --> Follows the specified playlist 
    // but don't include this playlist in the current user's public playlists
    //
    // @return Response with a header 200 if OK and empty response body. Header status code is error
    // code if request failed.
    // 
    // Important: Should you return an error?
    // Test that it returns correctly when user follows playlist
    // 
    followPlaylist = async (playlistID, queryParam) => {
        let serverResponse;

        try {
            let url = `https://api.spotify.com/v1/playlists/${playlistID}/followers`
            serverResponse =  await axios.put(url, {
                headers: {
                    'Authorization': 'Bearer ' + this.accessToken,
                    'Content-Type': 'application/json'
                },
                params: queryParam
            })
        } catch(error) {
            console.error('Error caught in followPlaylist function', error);
        }
        return serverResponse;
    }

    // 
    // Get the Current User's followed Artists
    // More information at [Get User's Followed Artists](https://developer.spotify.com/documentation/web-api/reference/follow/get-followed/)
    //
    // @param {Object} [options] queryParam Object with two optional parameters: limit and after. Limit should be an integer
    // and represents the max number of items to return. Default: 20, Min: 1, Max: 50. After should be a string and 
    // represents the last artist ID retrieved from the previous request. After can potentially be understood as having
    // the same effect as 'offset' in other requests.
    //
    // @example .getUserFollowedArtists({limit: 20}) --> Returns 20 first followed artists by the user
    //
    // @return {Object} Response object containing the user's followed artists or undefined if request fails.
    // 
    // Important: verify info above is true and make sure to mention that undefined is returned when request fails in other functions
    getUserFollowedArtists = async (queryParam) => {
        let followedArtist;

        try {
            let url = 'https://api.spotify.com/v1/me/following?type=artist'
            followedArtist =  await axios.put(url, {
                headers: {
                    'Authorization': 'Bearer ' + this.accessToken,
                },
                params: queryParam
            })
        } catch (error) {
            console.error('Error caught in getUserFollowedArtists function', error);
        }
        return followedArtist;
    }

    // IMPORTANT, TEST THIS FUNCTION because you didn't add Content Type in the Header
    
    // 
    // Removes one or more artist from the current user's list of followed artists
    // More information at [Unfollow Artists or Users](https://developer.spotify.com/documentation/web-api/reference/follow/unfollow-artists-users/)
    // 
    // @param {Array<string>}: Array of one or more artists' Spotify IDs
    //
    // @return {Object} An object with a status code 204 in the response header and an empty response
    // body if response body is empty. 
    //
    unfollowArtist = async(artistIDs) => {
        let responseBody;

        let queryParam = {
            type: 'artist',
            ids: artistIDs.join(',')
        }

        try {
            let url = 'https://api.spotify.com/v1/me/following'
            responseBody = await axios.delete(url, {
                headers: {
                    'Authorization': 'Bearer ' + this.accessToken,
                },
                params: queryParam
            })

        } catch (error) {
            console.error('Error caught in unfollowArtist function', error);
        }

        return responseBody;
    }

        
    // 
    // Removes one or more users from the current user's list of followed users
    // More information at [Unfollow Artists or Users](https://developer.spotify.com/documentation/web-api/reference/follow/unfollow-artists-users/)
    // 
    // @param {Array<string>}: Array of one or more users' Spotify IDs
    //
    // @return {Object} An object with a status code 204 in the response header and an empty response
    // body if response body is empty. 
    //
    unfollowUser = async(userIDs) => {
        let responseBody;

        let queryParam = {
            type: 'user',
            ids: userIDs.join(',')
        }

        try {
            let url = 'https://api.spotify.com/v1/me/following'
            responseBody = await axios.delete(url, {
                headers: {
                    'Authorization': 'Bearer ' + this.accessToken,
                },
                params: queryParam
            })

        } catch (error) {
            console.error('Error caught in unfollowUser function', error);
        }

        return responseBody;
    }

    // 
    // Removes the current user as a follower of a playlist
    // More information at [Unfollow Playlist](https://developer.spotify.com/documentation/web-api/reference/follow/unfollow-playlist/)
    // 
    // @param {string}: Playlist's Spotify ID
    //
    // @return {Object} An object with a status code 200 and empty response body if requet successful.
    //
    unfollowPlaylist = async(playlistID) => {
        let responseBody;

        try {
            let url = `https://api.spotify.com/v1/playlists/${playlistID}/followers`
            responseBody = await axios.delete(url, {
                headers: {
                    'Authorization': 'Bearer ' + this.accessToken,
                },
            })

        } catch (error) {
            console.error('Error caught in unfollowPlaylist function', error);
        }

        return responseBody;
    }

    // Show-related API Endpoints

    /*
    *
    * Get Spotify catalog information for a single show
    * More details can be found at [Get A Show](https://developer.spotify.com/documentation/web-api/reference/shows/get-a-show/)
    * 
    * @param {string} showID The show's Spotify ID
    * @param {Object} [options] queryParam Optional object containing up to one property "market"
    * which allows us to return only shows and episodes available in specified market
    * 
    * @return {Object} Object containing a repsonse header 200 and an object containing a show Object in JSON format
    */
    getShowData = async (showID, queryParam) => {
        let showData;

        try {
            let url = `https://api.spotify.com/v1/shows/${showID}`
            showData = await axios.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + this.accessToken,
                },
                params: queryParam
            })

        } catch (error) {
            console.error('Error caught in getShowData function', error);
        }
        return showData;
    }

    /*
    *
    * Get Spotify catalog information for several shows
    * More details can be found at [Get Several Shows](https://developer.spotify.com/documentation/web-api/reference/shows/get-several-shows/)
    * 
    * @param {Array<string>} Array of Spotify ID's for the shows. Max: 50 IDs.
    * @param {Object} [options] queryParam Optional object containing up to one property "market"
    * which allows us to return only shows and episodes available in specified market
    * 
    * @return {Object} An objecet w/ response header 200 and repsonse body containing a "shows" key whose value 
    * is an array of shows object in JSON format
    */
    getSeveralShowsData = async (showIDs, queryParam) => {
        let showsData;

        // Important to make sure that this returns undefined
        let param = {
            ids: showIDs.join(','),
            market: queryParam.market
        }

        try {
            let url = `https://api.spotify.com/v1/shows`
            showsData = await axios.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + this.accessToken,
                },
                params: param
            })

        } catch (error) {
            console.error('Error caught in getSeveralShowsData function', error);
        }
        return showsData;
    }    

    getShowEpisodes = async (showID, queryParam) => {
        let episodes;

        try {
            let url = `https://api.spotify.com/v1/shows/${showID}/episodes`;
            episodes = await axios.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + this.accessToken,
                },
                params: queryParam
            })
        } catch (error) {
            console.error('Error caught in getShowEpisodes function', error);
        }
        return episodes;
    }

    // Tracks 

    /*
    * Get Audio Analysis for a Track 
    * More details can be found at [Get Audio Analysis for a Track](https://developer.spotify.com/documentation/web-api/reference/tracks/get-audio-analysis/)
    * 
    * @param {string} trackID Spotify ID for the track
    * 
    * @return {Object} An object containing low-level audio analysis of the passed in track. Describes track's structure and musical content, including
    * rhythm, pitch, and timbre.
    * 
    */
    getTrackAnalysis = async (trackID) => {
        let trackAnalysis;

        try {
            let url = `https://api.spotify.com/v1/audio-analysis/${trackID}`;
            trackAnalysis = await axios.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + this.accessToken,
                }
            })
        } catch (error) {
            console.error(`Error caught in getTrackAnalysis function ${error}`)
        }
        return trackAnalysis;
    }


    /*
    * Get Audio Features for a Track 
    * More details can be found at [Get Audio Features for a Track](https://developer.spotify.com/documentation/web-api/reference/tracks/get-audio-features/)
    * 
    * @param {string} trackID Spotify ID for the track
    * 
    * @return {Object} An object containing audio features analysis such as "energy", "danceability", "key", "duration", "speechiness", etc.
    * 
    */
   getTrackFeatures = async (trackID) => {
        let trackFeatures;

        try {
            let url = `https://api.spotify.com/v1/audio-features/${trackID}`;
            trackFeatures = await axios.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + this.accessToken,
                }
            })
        } catch (error) {
            console.error(`Error caught in getTrackFeatures function ${error}`)
        }
        return trackFeatures;
    }

    // #toDo: decide between queryParam and paramObject as var names
    // #test: what happens if ID has a empty space in middle or beginnign / end?

    /*
    * Get Audio Features for Several Tracks
    * More details can be found at [Get Audio Features for Several Tracks](https://developer.spotify.com/documentation/web-api/reference/tracks/get-several-audio-features/)
    * 
    * @param {Array<string>} trackIDArray Array of Spotify IDs for the tracks. Maximuim: 100 IDs.
    * 
    * @return {Object} An object containing status code (200 if successful) and an object of key "audio_features" that contains an array of audio feature objects
    * in JSON format
    * 
    */
   getSeveralTrackFeatures = async (trackIDArray) => {
        let severalTrackFeatures;
        let paramObject = {
            ids: trackIDArray.join(','),
        }
        try {
            let url = `https://api.spotify.com/v1/audio-features`;
            severalTrackFeatures = await axios.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + this.accessToken,
                },
                params: paramObject
            })
        } catch (error) {
            console.error(`Error caught in getSeveralTrackFeatures function ${error}`)
        }
        return severalTrackFeatures;
    }


    // #toFix

    /*
    * Get Audio Features for Several Tracks
    * More details can be found at [Get Audio Features for Several Tracks](https://developer.spotify.com/documentation/web-api/reference/tracks/get-several-audio-features/)
    * 
    * @param {Array<string>} trackIDArray Array of Spotify IDs for the tracks. Maximum: 50 IDs.
    * 
    * @return {Object} An object containing status code (200 if successful) and an object of key "tracks" and whose value is an array of track objects
    * in JSON format
    * 
    */
    getSeveralTracks = async (trackIDArray, paramObj) => {
        let severalTracksData;
        let paramObject = {
            ids: trackIDArray.join(','),
        }
        try {
            let url = `https://api.spotify.com/v1/audio-features`;
            severalTracksData = await axios.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + this.accessToken,
                },
                params: paramObject
            })
        } catch (error) {
            console.error(`Error caught in getSeveralTracks function ${error}`)
        }
        return severalTracksData;
    }

    /*
    * Get Track Data
    * More details can be found at [Get a Track](https://developer.spotify.com/documentation/web-api/reference/tracks/get-track/)
    * 
    * @param {string} trackIDArray Array of Spotify IDs for the tracks. Maximum: 50 IDs.
    * @param {Object} [options] paramObject Optional object that can hold a "market" attribute, which represents an ISO 3166-1 alpha-2 
    * country code 
    * 
    * @return {Object} An object containing track data object
    * 
    */
    getTrackData = async (trackID, paramObject) => {
        let trackData;

        try {
            let url = `https://api.spotify.com/v1/tracks/${trackID}`;
            trackData = await axios.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + this.accessToken,
                },
                params: paramObject
            })
        } catch (error) {
            console.error(`Error caught in getTrackData function ${error}`)
        }
        return trackData;
    }

    /*
    * Get Current User's Profile 
    * More details can be found at [Get Current User's Profile](https://developer.spotify.com/documentation/web-api/reference/users-profile/get-current-users-profile/)
    * 
    * @return {Object} With status code 200 in the header if successful and user object in JSON format containing current user's data.
    * Returns error 403 Forbidden if requesting fields that you don't have the user's authorization to access.
    * 
    */
   getCurrentUserProfile = async () => {
       let currentUserData;

       try {
           let url = 'https://api.spotify.com/v1/me';
           currentUserData = await axios.get(url, {
            headers: {
                'Authorization': 'Bearer ' + this.accessToken,
            }
        })
       } catch (error) {
           console.error(`Error caught in getCurrentUserProfile function ${error}`)
       }
       return currentUserData;
   }

   /*
   * Get a User's Profile
   * More details can be found at [Get a User's Profile](https://developer.spotify.com/documentation/web-api/reference/users-profile/get-users-profile/)
   * 
   * @param {string} userID The user's Spotify user ID
   * 
   * @return {Object} An object containing public information about a Spotify user. If error encountered, error code returned. If usre does not exist
   * code 404 Not Found returned. 
   * 
   */
   getUserData = async (userID) => {
       let userData;

       try {
           let url = `https://api.spotify.com/v1/users/${userID}`
            userData = await axios.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + this.accessToken,
                }
            })
       } catch (error) {
           console.error(`Error encountered in the getUserData function ${error}`);
       }
       return userData;
   }



}

function isString (value) {
    return typeof value === 'string' || value instanceof String;
}


export default SpotifyAPI;


// Get New Releases function

         // if (limit == undefined && country == undefined && offset == undefined) {
            //     paramObject = {};
            // } else if (limit != undefined && country == undefined && offset == undefined) {
            //     paramObject = {
            //         limit: limit
            //     };
            // } else if (limit == undefined && country != undefined && offset == undefined) {
            //     paramObject = {
            //         country: country
            //     };
            // } else if (limit == undefined && country == undefined && offset != undefined) {
            //     paramObject = {
            //         offset: offset
            //     };
            // } else if (limit != undefined && country != undefined && offset == undefined) {
            //     paramObject = {
            //         limit: limit,
            //         country: country
            //     };
            // } else if (limit != undefined && country == undefined && offset != undefined) {
            //     paramObject = {
            //         limit: limit,
            //         offset: offset
            //     };
            // } else if (limit == undefined && country != undefined && offset != undefined) {
            //     paramObject = {
            //         country: country,
            //         offset: offset
            //     }
            // } else if (limit != undefined && country != undefined && offset != undefined) {
            //     paramObject = {
            //         country: country,
            //         offset: offset,
            //         limit: limit
            //     }
            // }
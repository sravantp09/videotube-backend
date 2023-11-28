import { Schema, model } from "mongoose";

const videoSchema = new Schema(
  {
    videoFile: {
      type: String, // 3rd party service url
      required: true,
    },
    thumbnail: {
      type: String, // 3rd party service url
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    duration: {
      type: Number, // from 3rd party service
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

const Video = model("Video", videoSchema);

export default Video;

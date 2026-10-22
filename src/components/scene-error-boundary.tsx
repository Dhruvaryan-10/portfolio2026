"use client";

import React from "react";

/**
 * Keeps the rest of the page working if the 3D Spline scene fails to load
 * (slow network, blocked CDN, no WebGL). The scene is decorative, so on error
 * we simply render nothing in its place.
 */
export default class SceneErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: unknown) {
    console.warn("3D scene failed to load; continuing without it.", error);
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}

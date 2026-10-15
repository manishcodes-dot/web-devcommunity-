import { useState, useMemo } from 'react';
import avatar, {
  createAvatar,
  getIllustratedAvatar,
  getPalettes,
  getShapes,
  getHairstyles,
  ILLUSTRATED_AVATARS,
} from 'craft-avatar';

export {
  createAvatar,
  getIllustratedAvatar,
  getPalettes,
  getShapes,
  getHairstyles,
  ILLUSTRATED_AVATARS,
};

/**
 * Generate a data URI person avatar url using craft-avatar
 */
export function getPersonAvatarUrl(seedOrOptions, options = {}) {
  try {
    if (typeof seedOrOptions === 'string' || typeof seedOrOptions === 'number') {
      return avatar({ seed: String(seedOrOptions), shape: 'circle', ...options }).dataUri;
    }
    return avatar({ shape: 'circle', ...seedOrOptions }).dataUri;
  } catch (err) {
    console.warn('craft-avatar generation fallback:', err);
    return '';
  }
}

/**
 * Generate illustrated person avatar url using craft-avatar
 */
export function getIllustratedAvatarUrl(idOrSeed = 1) {
  try {
    return getIllustratedAvatar(idOrSeed).dataUri;
  } catch (err) {
    console.warn('craft-avatar illustrated fallback:', err);
    return '';
  }
}

/**
 * UserAvatar - Robust person avatar component powered by craft-avatar.
 *
 * Displays custom image if available and valid; otherwise automatically
 * generates a deterministic, expressive person avatar based on name/seed.
 */
export function UserAvatar({
  src,
  name = '',
  email = '',
  seed,
  size = 40,
  shape = 'circle',
  palette,
  hair,
  mode, // 'comic' | 'illustration'
  className = '',
  alt,
  badge,
  badgeClassName = '',
  ...restProps
}) {
  const [imgError, setImgError] = useState(false);

  // Derive deterministic seed from seed -> name -> email -> 'developer'
  const effectiveSeed = useMemo(() => {
    if (seed !== undefined && seed !== null && String(seed).trim()) return String(seed).trim();
    if (name && String(name).trim()) return String(name).trim();
    if (email && String(email).trim()) return String(email).trim();
    return 'developer';
  }, [seed, name, email]);

  // Generate craft-avatar deterministic person avatar as fallback or primary
  const generatedAvatar = useMemo(() => {
    try {
      if (mode === 'illustration') {
        const ill = getIllustratedAvatar(effectiveSeed);
        return ill.dataUri;
      }
      const res = avatar({
        seed: effectiveSeed,
        size: typeof size === 'number' ? Math.max(32, Math.min(size * 2, 512)) : 128,
        shape: shape === 'square' ? 'square' : shape === 'rounded' ? 'rounded' : 'circle',
        palette,
        hair,
      });
      return res.dataUri;
    } catch {
      return '';
    }
  }, [effectiveSeed, size, shape, palette, hair, mode]);

  // Determine if we should display the external src or the generated craft-avatar
  const hasValidExternalSrc = Boolean(
    src &&
    typeof src === 'string' &&
    src.trim().length > 0 &&
    (src.startsWith('data:image/') || src.startsWith('http://') || src.startsWith('https://') || src.startsWith('/'))
  );

  const displaySrc = (!imgError && hasValidExternalSrc) ? src : generatedAvatar;
  const computedAlt = alt || name || effectiveSeed || 'User avatar';

  // Shape class
  const shapeClass =
    shape === 'rounded'
      ? 'rounded-2xl'
      : shape === 'square'
      ? 'rounded-lg'
      : 'rounded-full';

  const numericSize = typeof size === 'number' ? `${size}px` : undefined;

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 select-none ${className}`}
      style={numericSize ? { width: numericSize, height: numericSize } : undefined}
    >
      <img
        src={displaySrc}
        alt={computedAlt}
        onError={() => setImgError(true)}
        className={`w-full h-full object-cover transition-opacity duration-200 ${shapeClass}`}
        loading="lazy"
        {...restProps}
      />

      {badge && (
        <span
          className={`absolute bottom-0 right-0 rounded-full border-2 border-white dark:border-zinc-950 ${badgeClassName}`}
        >
          {badge}
        </span>
      )}
    </div>
  );
}

export default UserAvatar;

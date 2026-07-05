// src/components/visuals/ProductMockup.tsx — Layered product visualization for hero
import { motion } from 'framer-motion'
import { Phone, Video, Shield, Heart } from 'lucide-react'
import { getMetricValue } from '@/data/metrics'
import { cn } from '@/lib/utils'

interface ProductMockupProps {
  compact?: boolean
  className?: string
}

export function ProductMockup({ compact = false, className }: ProductMockupProps) {
  const countries = getMetricValue('countries')

  return (
    <div
      className={cn(
        'relative mx-auto w-full overflow-hidden',
        compact
          ? 'h-[200px] max-w-[272px] sm:h-[220px] sm:max-w-[300px]'
          : 'aspect-square max-w-lg',
        className,
      )}
      aria-hidden="true"
    >
      <div
        className={cn(
          'pointer-events-none absolute inset-0 rounded-full bg-hero-glow blur-3xl',
          compact ? 'opacity-50' : 'opacity-100',
        )}
      />

      <motion.div
        className={cn(
          'absolute rounded-2xl liquid-glass-card shadow-elevated',
          compact
            ? 'top-1 right-0 w-[72%] p-3 sm:top-2 sm:p-4'
            : 'top-8 right-0 w-[75%] p-5',
        )}
        initial={{ opacity: 0, y: 20, rotate: 3 }}
        animate={{ opacity: 1, y: 0, rotate: 3 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div className={cn('flex items-center gap-2', compact ? 'mb-2' : 'mb-4')}>
          <div className="h-2 w-2 rounded-full bg-emerald-400 sm:h-2.5 sm:w-2.5" />
          <span className={cn('font-medium text-muted-foreground', compact ? 'text-[10px]' : 'text-xs')}>
            Family Dashboard
          </span>
        </div>
        <div className={compact ? 'space-y-1' : 'space-y-2'}>
          {['Mom', 'Dad', 'Grandma'].map((name) => (
            <div
              key={name}
              className={cn(
                'flex items-center rounded-xl bg-accent/60',
                compact ? 'gap-2 px-2 py-1.5' : 'gap-3 px-3 py-2.5',
              )}
            >
              <div
                className={cn(
                  'flex items-center justify-center rounded-full bg-kch-muted',
                  compact ? 'h-6 w-6' : 'h-8 w-8',
                )}
              >
                <Heart className={cn('text-kch', compact ? 'h-3 w-3' : 'h-3.5 w-3.5')} />
              </div>
              <div className="min-w-0 flex-1">
                <p className={cn('font-medium', compact ? 'text-[10px]' : 'text-xs')}>{name}</p>
                <p className={cn('text-muted-foreground', compact ? 'text-[9px]' : 'text-[10px]')}>Available</p>
              </div>
              <div
                className={cn(
                  'flex items-center justify-center rounded-full bg-kch text-white',
                  compact ? 'h-5 w-5' : 'h-7 w-7',
                )}
              >
                <Video className={cn(compact ? 'h-2.5 w-2.5' : 'h-3 w-3')} />
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        className={cn(
          'absolute bottom-0 left-0 liquid-glass-card shadow-elevated',
          compact
            ? 'w-[58%] rounded-[1.5rem] p-2'
            : 'w-[65%] rounded-[2rem] p-3',
        )}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
      >
        <div
          className={cn(
            'overflow-hidden bg-gradient-to-b from-kch-muted/40 to-background',
            compact ? 'rounded-[1.15rem]' : 'rounded-[1.5rem]',
          )}
        >
          <div className={cn('flex items-center justify-between', compact ? 'px-3 py-1' : 'px-5 py-2')}>
            <span className={cn('font-medium', compact ? 'text-[9px]' : 'text-[10px]')}>9:41</span>
            <div
              className={cn(
                'mx-auto rounded-full bg-foreground/10',
                compact ? 'h-3.5 w-12' : 'h-5 w-16',
              )}
            />
            <Phone className={cn('text-muted-foreground', compact ? 'h-2.5 w-2.5' : 'h-3 w-3')} />
          </div>

          <div className={cn(compact ? 'px-3 pb-3 pt-0.5' : 'px-5 pb-6 pt-2')}>
            <p className={cn('font-semibold', compact ? 'text-xs' : 'text-sm')}>Kids Call Home</p>
            <p className={cn('text-muted-foreground', compact ? 'text-[9px]' : 'text-[10px]')}>
              Tap to call family
            </p>

            <div className={cn('grid grid-cols-2', compact ? 'mt-2 gap-1.5' : 'mt-5 gap-3')}>
              {[
                { name: 'Mom', color: 'bg-rose-500' },
                { name: 'Dad', color: 'bg-blue-500' },
                { name: 'Grandma', color: 'bg-amber-500' },
                { name: 'Grandpa', color: 'bg-emerald-500' },
              ].map((contact) => (
                <div
                  key={contact.name}
                  className={cn(
                    'flex flex-col items-center rounded-2xl bg-card/80 shadow-premium',
                    compact ? 'gap-1 p-2' : 'gap-2 p-4',
                  )}
                >
                  <div
                    className={cn(
                      `flex items-center justify-center rounded-full font-semibold text-white ${contact.color}`,
                      compact ? 'h-8 w-8 text-[10px]' : 'h-12 w-12 text-sm',
                    )}
                  >
                    {contact.name[0]}
                  </div>
                  <span className={cn('font-medium', compact ? 'text-[9px]' : 'text-[11px]')}>
                    {contact.name}
                  </span>
                </div>
              ))}
            </div>

            <div
              className={cn(
                'flex items-center justify-center rounded-full bg-emerald-500/10',
                compact ? 'mt-2 gap-1 px-2 py-0.5' : 'mt-4 gap-1.5 px-3 py-1.5',
              )}
            >
              <Shield
                className={cn(
                  'text-emerald-600 dark:text-emerald-400',
                  compact ? 'h-2.5 w-2.5' : 'h-3 w-3',
                )}
              />
              <span
                className={cn(
                  'font-medium text-emerald-700 dark:text-emerald-400',
                  compact ? 'text-[8px]' : 'text-[10px]',
                )}
              >
                Parent approved
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        className={cn(
          'absolute rounded-full liquid-glass-card shadow-premium',
          compact
            ? 'top-[42%] right-0 px-2 py-0.5'
            : 'top-1/2 right-4 px-4 py-2',
        )}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <p className={cn('font-semibold tabular-nums', compact ? 'text-[10px]' : 'text-xs')}>
          {countries} countries
        </p>
      </motion.div>
    </div>
  )
}

import { Button } from '@/components/ui/button';
import { Calendar, Mail } from 'lucide-react';

export default function HirePage() {
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL;

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center space-y-8">
          <h1 className="text-4xl font-bold">Hire Justin</h1>
          
          <div className="max-w-2xl mx-auto space-y-6">
            <p className="text-xl text-muted-foreground">
              Ready to build something amazing? I specialize in creating lean, scalable systems 
              that deliver real value. Let&apos;s discuss your project and how we can bring your vision to life.
            </p>
            
            <div className="bg-muted/30 rounded-lg p-8 space-y-6">
              <h2 className="text-2xl font-semibold">What I Can Help With</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                <div className="space-y-2">
                  <h3 className="font-medium">Full-Stack Development</h3>
                  <p className="text-sm text-muted-foreground">
                    End-to-end web applications with modern frameworks
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">Performance Optimization</h3>
                  <p className="text-sm text-muted-foreground">
                    Speed up your applications and improve user experience
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">System Architecture</h3>
                  <p className="text-sm text-muted-foreground">
                    Design scalable, maintainable solutions
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">Technical Consulting</h3>
                  <p className="text-sm text-muted-foreground">
                    Strategic guidance and code reviews
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {calendlyUrl ? (
                <Button asChild size="lg">
                  <a href={calendlyUrl} target="_blank" rel="noopener noreferrer">
                    <Calendar className="mr-2 h-4 w-4" />
                    Schedule a Call
                  </a>
                </Button>
              ) : (
                <Button asChild size="lg">
                  <a href="mailto:work@justinwessels.com">
                    <Mail className="mr-2 h-4 w-4" />
                    Get In Touch
                  </a>
                </Button>
              )}
              
              <Button variant="outline" size="lg" asChild>
                <a href="mailto:work@justinwessels.com">
                  <Mail className="mr-2 h-4 w-4" />
                  Email Directly
                </a>
              </Button>
            </div>
            
            <div className="text-sm text-muted-foreground">
              <p>
                <strong>Response time:</strong> Usually within 24 hours
              </p>
              <p>
                <strong>Availability:</strong> Currently accepting new projects
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

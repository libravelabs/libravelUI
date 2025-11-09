"use client";

import { Button } from "@/components/ui/core/button";
import {
  Dock,
  DockBody,
  DockClose,
  DockContent,
  DockDescription,
  DockFooter,
  DockHeader,
  DockTitle,
  DockTrigger,
} from "@/components/ui/core/dock";
import { Link } from "@/components/ui/core/link";

export default function StickyDock() {
  return (
    <Dock>
      <DockTrigger>More Info</DockTrigger>
      <DockContent>
        <DockHeader>
          <DockTitle>Taxi Driver (1976)</DockTitle>
          <DockDescription>
            A lonely veteran becomes dangerously unhinged in the gritty streets
            of 1970s New York.
          </DockDescription>
        </DockHeader>
        <DockBody>
          <div className="prose prose-zinc dark:prose-invert">
            <p>
              <strong>Director:</strong> Martin Scorsese
              <br />
              <strong>Writer:</strong> Paul Schrader
              <br />
              <strong>Starring:</strong> Robert De Niro, Jodie Foster, Cybill
              Shepherd, Harvey Keitel
              <br />
              <strong>Genre:</strong> Crime, Drama, Psychological Thriller
              <br />
              <strong>Runtime:</strong> 1h 54m
            </p>

            <h3>Synopsis</h3>
            <p>
              Travis Bickle, an honorably discharged Marine, becomes a
              night-time taxi driver in New York City to cope with his insomnia.
              Isolated and increasingly disillusioned by the decay and
              corruption he sees around him, Travis spirals into a dangerous
              mental state. His obsession with a political campaign worker and
              his desire to clean up the city drive him toward violent action.
            </p>

            <h3>Notable Quotes</h3>
            <ul>
              <li>&quot;You talkin&apos; to me?&quot;</li>
              <li>
                &quot;Someday a real rain will come and wash all this scum off
                the streets.&quot;
              </li>
            </ul>

            <h3>Legacy</h3>
            <p>
              <em>Taxi Driver</em> is widely considered one of the greatest
              films of all time. It received four Academy Award nominations,
              including Best Picture, and won the Palme d&apos;Or at the 1976
              Cannes Film Festival. Robert De Niro&apos;s performance has become
              iconic in cinematic history.
            </p>

            <h3>Trivia</h3>
            <ul>
              <li>
                The line &quot;You talkin&apos; to me?&quot; was improvised by
                Robert De Niro.
              </li>
              <li>Jodie Foster was only 12 years old during filming.</li>
              <li>
                Bernard Herrmann composed the haunting score shortly before his
                death.
              </li>
            </ul>
          </div>
        </DockBody>
        <DockFooter>
          <DockClose>Close</DockClose>
          <Link
            href="https://www.imdb.com/video/vi474987289/?playlistId=tt0075314"
            target="_blank"
          >
            <Button variant="secondary">Watch Trailer</Button>
          </Link>
        </DockFooter>
      </DockContent>
    </Dock>
  );
}
